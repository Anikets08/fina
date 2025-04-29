from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.chat import chat_router
from backend.routes.user import user_router

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user_router)
app.include_router(chat_router)
@app.get("/")
def read_root():
    return "Working Fine..."