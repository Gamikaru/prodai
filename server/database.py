from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config import DATABASE_URL
import logging

# Configure logging
logger = logging.getLogger(__name__)
logger.debug(f"Creating engine with DATABASE_URL: {DATABASE_URL}")

engine = create_engine(DATABASE_URL, echo=False)  # Set echo=True for SQL query logs

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
logger.info("Database session local created.")

def get_db():
    """Provide a database session to FastAPI endpoints."""
    logger.debug("Creating new database session.")
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        logger.error(f"Database session error: {e}")
        raise
    finally:
        db.close()
        logger.debug("Database session closed.")