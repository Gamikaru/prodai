from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from typing import Dict

import logging

# Configure logging
logger = logging.getLogger(__name__)
logger.debug("Loading Pydantic schemas.")

class UserCreate(BaseModel):
    email: EmailStr
    password: str

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