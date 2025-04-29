from fastapi import APIRouter
from backend.services.core import run_llm
from pydantic import BaseModel
chat_router = APIRouter()

class ChatModel(BaseModel):
    chat:str

# GET REQUESTS
@chat_router.post("/chat")
async def chat(query: ChatModel):
    print(query.chat)
    if query.chat == "":
        return {
            "message":"query is empty",
            "status":400,
        }
    else:
        generated_response = run_llm(
            query=query.chat, chat_history=[]
        )
        return {
            "message": generated_response['answer'],
            "status":200,
        }