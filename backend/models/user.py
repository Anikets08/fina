from pydantic import BaseModel, Field
from typing import List
from backend.models.account import Account
from backend.models.transaction import Transaction


class User(BaseModel):
    user_id: str = Field(..., description="User Id")
    account_info: Account = Field(..., description="Account info")
    transactions: List[Transaction] = Field(..., description="Transactions")