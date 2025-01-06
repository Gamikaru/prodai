# server/routers/onboarding.py

from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import List
import json
import jwt
import logging

from database import get_db
from models import QuestionnaireResponse, User
from schemas import QuestionnaireResponseCreate, QuestionnaireResponseOut
from config import JWT_SECRET, JWT_ALGORITHM

router = APIRouter(prefix="/onboarding", tags=["Onboarding"])

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

@router.post("/submit", response_model=QuestionnaireResponseOut)
def submit_questionnaire(
    questionnaire: QuestionnaireResponseCreate,
    db: Session = Depends(get_db),
    token: str = Header(None)
):
    logger.debug("Submitting questionnaire responses.")
    try:
        user = get_current_user(token, db)
        if not user:
            logger.warning("Unauthorized attempt to submit questionnaire.")
            raise HTTPException(status_code=401, detail="Not authenticated")

        # Validate and serialize responses
        responses_json = json.dumps(questionnaire.responses)

        questionnaire_response = QuestionnaireResponse(
            user_id=user.id,
            responses=responses_json
        )
        db.add(questionnaire_response)
        db.commit()
        db.refresh(questionnaire_response)
        logger.info(f"Questionnaire response saved for user {user.email}.")
        return QuestionnaireResponseOut(
            id=questionnaire_response.id,
            user_id=questionnaire_response.user_id,
            responses=questionnaire.responses,
            created_at=questionnaire_response.created_at
        )
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error submitting questionnaire: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/responses", response_model=List[QuestionnaireResponseOut])
def get_questionnaire_responses(
    db: Session = Depends(get_db),
    token: str = Header(None)
):
    logger.debug("Fetching questionnaire responses.")
    try:
        user = get_current_user(token, db)
        if not user:
            logger.warning("Unauthorized attempt to fetch questionnaire responses.")
            raise HTTPException(status_code=401, detail="Not authenticated")

        responses = db.query(QuestionnaireResponse).filter(QuestionnaireResponse.user_id == user.id).all()
        logger.info(f"Fetched {len(responses)} questionnaire responses for user {user.email}.")

        response_out = []
        for r in responses:
            try:
                responses_dict = json.loads(r.responses)
            except json.JSONDecodeError:
                responses_dict = {}
            response_out.append(
                QuestionnaireResponseOut(
                    id=r.id,
                    user_id=r.user_id,
                    responses=responses_dict,
                    created_at=r.created_at
                )
            )

        return response_out
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error fetching questionnaire responses: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")