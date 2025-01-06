# server/routers/auth.py
# this file contains the FastAPI router for handling user registration and login.

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta, timezone
import logging

from database import get_db
from models import User
from schemas import UserCreate, UserLogin, UserOut
from config import JWT_SECRET, JWT_ALGORITHM

router = APIRouter(prefix="/auth", tags=["Auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Configure logging
logger = logging.getLogger(__name__)

def create_access_token(data: dict, expires_delta: int = 30):
    logger.debug("Creating access token.")
    try:
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + timedelta(minutes=expires_delta)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
        logger.debug(f"Access token created: {encoded_jwt}")
        return encoded_jwt
    except Exception as e:
        logger.error(f"Error creating access token: {e}")
        raise

@router.post("/register", response_model=UserOut)
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    logger.debug(f"Registering user with email: {user_data.email}")
    try:
        # Check if user exists
        existing_user = db.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            logger.warning(f"Registration attempt with existing email: {user_data.email}")
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed_pw = pwd_context.hash(user_data.password)
        new_user = User(email=user_data.email, hashed_password=hashed_pw)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        logger.info(f"User registered successfully: {new_user.email}")
        return new_user
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error registering user: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/login")
def login_user(user_data: UserLogin, db: Session = Depends(get_db)):
    logger.debug(f"Login attempt for email: {user_data.email}")
    try:
        user = db.query(User).filter(User.email == user_data.email).first()
        if not user or not pwd_context.verify(user_data.password, user.hashed_password):
            logger.warning(f"Invalid login credentials for email: {user_data.email}")
            raise HTTPException(status_code=401, detail="Invalid credentials")

        access_token = create_access_token({"sub": user.email})
        logger.info(f"User logged in successfully: {user.email}")
        return {"access_token": access_token, "token_type": "bearer"}
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Error during login: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")