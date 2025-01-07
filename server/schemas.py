
# filepath: /Ubuntu/home/gamikarudev/projects/pyhton-projects/my-planner-ai-app/server/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict
from datetime import datetime

import logging

# Configure logging
logger = logging.getLogger(__name__)
logger.debug("Loading Pydantic schemas.")

class UserCreate(BaseModel):
    email: EmailStr
    password:  str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    is_active: bool

    class Config:
        orm_mode = True

class PlanCreate(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None

class PlanOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    created_at: Optional[datetime]
    due_date: Optional[datetime]
    is_completed: bool = False  # Add this line

    class Config:
        orm_mode = True

class QuestionnaireResponseBase(BaseModel):
    responses: Dict[str, str]

class QuestionnaireResponseCreate(QuestionnaireResponseBase):
    pass

class QuestionnaireResponseOut(QuestionnaireResponseBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        orm_mode = True

# Remove the standalone Config class
# class Config:
#     orm_mode = True