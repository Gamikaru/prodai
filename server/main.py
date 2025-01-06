import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, plans, ai, onboarding
from models import init_db
import logging
import openai

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,  # Set to DEBUG to capture all levels of log messages
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

app = FastAPI(title="AI Planner App")

# Initialize DB tables
logger.debug("Initializing database tables.")
try:
    init_db()
    logger.info("Database tables initialized successfully.")
except Exception as e:
    logger.error(f"Error initializing database: {e}")

# Add CORS middleware
logger.debug("Adding CORS middleware.")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
logger.info("CORS middleware added.")

# Include routers
logger.debug("Including auth router.")
app.include_router(auth.router)
logger.debug("Auth router included.")

logger.debug("Including plans router.")
app.include_router(plans.router)
logger.debug("Plans router included.")

logger.debug("Including AI router.")
app.include_router(ai.router)
logger.debug("AI router included.")

logger.debug("Including onboarding router.")
app.include_router(onboarding.router)

if __name__ == "__main__":
    logger.info("Starting FastAPI server.")
    try:
        uvicorn.run(app, host="0.0.0.0", port=8000, reload=True, log_level="debug")
    except Exception as e:
        logger.error(f"Failed to start server: {e}")