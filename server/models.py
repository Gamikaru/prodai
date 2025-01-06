from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, relationship
from database import engine
import logging
from datetime import datetime

# Configure logging
logger = logging.getLogger(__name__)
logger.debug("Defining database models.")

Base = declarative_base()

class QuestionnaireResponse(Base):
    __tablename__ = 'questionnaire_responses'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    responses = Column(String, nullable=False)  # Store as JSON string
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="questionnaire_responses")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

    plans = relationship("Plan", back_populates="owner")
    questionnaire_responses = relationship("QuestionnaireResponse", back_populates="user")

class Plan(Base):
    __tablename__ = "plans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String)
    created_at = Column(DateTime, nullable=False)
    due_date = Column(DateTime)

    owner = relationship("User", back_populates="plans")




def init_db():
    logger.debug("Initializing database tables.")
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully.")
    except Exception as e:
        logger.error(f"Error creating database tables: {e}")