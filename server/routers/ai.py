from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import logging
from config import OPENAI_API_KEY
from typing import Optional
import openai
from openai import APIError

# Ensure the API key is set before initializing the client
if not OPENAI_API_KEY:
    raise ValueError("OpenAI API key not configured.")

openai.api_key = OPENAI_API_KEY

system_message = (
    "You are ProdAI, a highly efficient and organized virtual assistant designed to help users increase their productivity. "
    "You assist with managing tasks, scheduling, setting reminders, providing focused work strategies, and offering motivational support. "
    "Respond in a clear, concise, and actionable manner to help users optimize their time and resources."
)

# Configure logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)  # Ensure all debug logs are captured
logger.debug(f"OpenAI library version: {openai.__version__}")


# Add handler if not already configured
if not logger.handlers:
    handler = logging.StreamHandler()
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)

router = APIRouter(prefix="/ai", tags=["AI"])

class ChatRequest(BaseModel):
    prompt: str
    user_context: Optional[dict] = None  # Additional context about the user
    conversation_history: Optional[list] = None  # List of past messages

@router.post("/chat")
def chat_with_ai(chat_request: ChatRequest):
    prompt = chat_request.prompt
    user_context = chat_request.user_context or {}
    conversation_history = chat_request.conversation_history or []
    logger.debug(f"Received prompt for AI chat: {prompt}")
    logger.debug(f"User context: {user_context}")
    logger.debug(f"Conversation history length: {len(conversation_history)}")

    try:
        logger.debug("Sending prompt to OpenAI ChatCompletion API.")

        messages = [
            {"role": "system", "content": system_message},
        ]

        # Incorporate user context if available
        if user_context:
            messages.append({"role": "user", "content": f"User context: {user_context}"})

        # Append conversation history
        for msg in conversation_history:
            messages.append({"role": msg['role'], "content": msg['content']})

        messages.append({"role": "user", "content": prompt})

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=200,
            temperature=0.6,
            top_p=1.0,
            frequency_penalty=0.2,
            presence_penalty=0.2
        )

        reply = response.choices[0].message.content.strip()
        logger.debug(f"Received reply from AI: {reply}")
        return {"reply": reply}
    except APIError as e:
        logger.error(f"OpenAI API error: {e}")
        if "insufficient_quota" in str(e).lower():
            raise HTTPException(status_code=429, detail="You have exceeded your quota. Please check your subscription or billing details.")
        if "model_not_found" in str(e).lower():
            raise HTTPException(status_code=500, detail="The requested model was not found.")
        raise HTTPException(status_code=500, detail="An error occurred while processing your request. Please try again later.")
    except Exception as e:
        logger.error(f"Unexpected error in AI chat: {e}")
        raise HTTPException(status_code=500, detail="An internal server error occurred. Please contact support.")