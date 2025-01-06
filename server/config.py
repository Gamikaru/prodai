import os
from dotenv import load_dotenv
import logging

# Load environment variables from .env file
load_dotenv()

# Configure logging for config module
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

formatter = logging.Formatter("%(asctime)s [%(levelname)s] %(name)s: %(message)s")
handler = logging.StreamHandler()
handler.setFormatter(formatter)
logger.addHandler(handler)

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/mydb")
JWT_SECRET = os.getenv("JWT_SECRET", "SUPERSECRET")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

logger.debug(f"DATABASE_URL: {DATABASE_URL}")
logger.debug(f"JWT_SECRET: {'***' if JWT_SECRET else 'Not set'}")
logger.debug(f"JWT_ALGORITHM: {JWT_ALGORITHM}")
logger.debug(f"OPENAI_API_KEY: {'***' if OPENAI_API_KEY else 'Not set'}")