from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import logging
from config import OPENAI_API_KEY
import openai
from openai import APIError

# Ensure the API key is set before initializing the client
if not OPENAI_API_KEY:
    raise ValueError("OpenAI API key not configured.")

openai.api_key = OPENAI_API_KEY

# Configure logging
logger = logging.getLogger(__name__)
logger.debug(f"OpenAI library version: {openai.__version__}")

router = APIRouter(prefix="/ai", tags=["AI"])

class ChatRequest(BaseModel):
    prompt: str

@router.post("/chat")
def chat_with_ai(chat_request: ChatRequest):
    prompt = chat_request.prompt
    logger.debug(f"Received prompt for AI chat: {prompt}")
    try:
        logger.debug("Sending prompt to OpenAI ChatCompletion API.")
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,
            temperature=0.7
        )

        reply = response.choices[0].message.content.strip()
        logger.debug(f"Received reply from AI: {reply}")
        return {"reply": reply}
    except APIError as e:
        logger.error(f"OpenAI API error: {e}")
        if "insufficient_quota" in str(e):
            raise HTTPException(status_code=429, detail="You exceeded your current quota. Please check your plan and billing details.")
        if "model_not_found" in str(e):
            raise HTTPException(status_code=500, detail="Invalid model specified")
        raise HTTPException(status_code=500, detail="Error communicating with OpenAI API")
    except Exception as e:
        logger.error(f"Unexpected error in AI chat: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")