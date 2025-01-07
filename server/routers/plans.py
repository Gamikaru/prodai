from fastapi import APIRouter, Depends, HTTPException, Header, Path, Body
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
import jwt
import logging

from database import get_db
from schemas import PlanCreate, PlanOut
from models import Plan, User
from config import JWT_SECRET, JWT_ALGORITHM

router = APIRouter(prefix="/plans", tags=["Plans"])

# Configure logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.DEBUG)

class PlanUpdate(BaseModel):
    is_completed: Optional[bool] = None
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[datetime] = None

def get_current_user(token: str = Header(None), db: Session = Depends(get_db)):
    logger.debug("Retrieving current user from token.")
    try:
        if not token:
            logger.warning("No token provided in request headers.")
            return None
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        email = payload.get("sub")
        if not email:
            logger.warning("Token payload does not contain 'sub'.")
            return None
        user = db.query(User).filter(User.email == email).first()
        if user:
            logger.debug(f"Authenticated user: {user.email}")
        else:
            logger.warning(f"User not found for email: {email}")
        return user
    except jwt.ExpiredSignatureError:
        logger.error("Token has expired.")
        return None
    except jwt.InvalidTokenError:
        logger.error("Invalid token.")
        return None
    except Exception as e:
        logger.error(f"Error retrieving user from token: {e}", exc_info=True)
        return None

@router.post("/", response_model=PlanOut)
def create_plan(
    plan: PlanCreate,
    db: Session = Depends(get_db),
    token: str = Header(None)
):
    logger.debug(f"Creating plan: {plan.title}")
    try:
        user = get_current_user(token, db)
        if not user:
            logger.warning("Unauthorized attempt to create a plan.")
            raise HTTPException(status_code=401, detail="Not authenticated")

        new_plan = Plan(
            user_id=user.id,
            title=plan.title,
            description=plan.description,
            created_at=datetime.now(timezone.utc),
            due_date=plan.due_date,
            is_completed=False  # Add explicit default
        )
        db.add(new_plan)
        db.commit()
        db.refresh(new_plan)
        logger.info(f"Plan created successfully: {new_plan.title} by user {user.email}")
        return new_plan
    except HTTPException as he:
        logger.error(f"HTTPException: {he.detail}")
        raise he
    except Exception as e:
        logger.error(f"Error creating plan: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/", response_model=list[PlanOut])
def get_plans(
    db: Session = Depends(get_db),
    token: str = Header(None)
):
    logger.debug("Fetching user plans.")
    try:
        user = get_current_user(token, db)
        if not user:
            logger.warning("Unauthorized attempt to fetch plans.")
            raise HTTPException(status_code=401, detail="Not authenticated")

        plans = db.query(Plan).filter(Plan.user_id == user.id).all()
        logger.info(f"Fetched {len(plans)} plans for user {user.email}.")
        return plans
    except HTTPException as he:
        logger.error(f"HTTPException: {he.detail}")
        raise he
    except Exception as e:
        logger.error(f"Error fetching plans: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")

@router.patch("/{plan_id}", response_model=PlanOut)
def update_plan(
    plan_id: int,
    plan_update: PlanUpdate,
    db: Session = Depends(get_db),
    token: str = Header(None)
):
    logger.debug(f"Updating plan: {plan_id}")
    try:
        user = get_current_user(token, db)
        if not user:
            logger.warning("Unauthorized attempt to update plan")
            raise HTTPException(status_code=401, detail="Not authenticated")

        plan = db.query(Plan).filter(Plan.id == plan_id, Plan.user_id == user.id).first()
        if not plan:
            logger.warning(f"Plan not found or unauthorized: {plan_id}")
            raise HTTPException(status_code=404, detail="Plan not found")

        if plan_update.is_completed is not None:
            plan.is_completed = plan_update.is_completed
        if plan_update.title is not None:
            plan.title = plan_update.title
        if plan_update.description is not None:
            plan.description = plan_update.description
        if plan_update.due_date is not None:
            plan.due_date = plan_update.due_date

        db.commit()
        db.refresh(plan)
        logger.info(f"Plan updated successfully: {plan.title}")
        return plan
    except HTTPException as he:
        logger.error(f"HTTPException: {he.detail}")
        raise he
    except Exception as e:
        logger.error(f"Error updating plan: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")

@router.delete("/{plan_id}")
def delete_plan(
    plan_id: int,
    db: Session = Depends(get_db),
    token: str = Header(None)
):
    logger.debug(f"Deleting plan: {plan_id}")
    try:
        user = get_current_user(token, db)
        if not user:
            logger.warning("Unauthorized attempt to delete plan")
            raise HTTPException(status_code=401, detail="Not authenticated")

        plan = db.query(Plan).filter(Plan.id == plan_id, Plan.user_id == user.id).first()
        if not plan:
            logger.warning(f"Plan not found or unauthorized: {plan_id}")
            raise HTTPException(status_code=404, detail="Plan not found")

        db.delete(plan)
        db.commit()
        logger.info(f"Plan deleted successfully: {plan_id}")
        return {"message": "Plan deleted successfully"}
    except HTTPException as he:
        logger.error(f"HTTPException: {he.detail}")
        raise he
    except Exception as e:
        logger.error(f"Error deleting plan: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")

