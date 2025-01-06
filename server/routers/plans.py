from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
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
    except jwt.PyJWTError as e:
        logger.error(f"JWT decoding error: {e}")
        return None
    except Exception as e:
        logger.error(f"Error retrieving user from token: {e}")
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
            due_date=plan.due_date
        )
        db.add(new_plan)
        db.commit()
        db.refresh(new_plan)
        logger.info(f"Plan created successfully: {new_plan.title} by user {user.email}")
        return new_plan
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error creating plan: {e}")
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
        raise he
    except Exception as e:
        logger.error(f"Error fetching plans: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")