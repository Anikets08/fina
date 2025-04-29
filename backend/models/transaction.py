from typing import  Optional
from pydantic import BaseModel, Field

class Transaction(BaseModel):
    order: int = Field(..., description="Transaction order number")
    balance: Optional[float] = Field(..., description="Account balance after this transaction")
    card_number: Optional[str] = Field(None, description="Card number if available")
    credit_amount: Optional[float] = Field(None, description="Amount credited to account")
    debit_amount: Optional[float] = Field(None, description="Amount debited from account")
    date: str = Field(..., description="Transaction date in YYYY-MM-DD format")
    posted_date: Optional[str] = Field(None, description="Date transaction was posted, if different")
    description: Optional[str] = (Field(..., description="Transaction description"))
    transaction_id: Optional[str] = Field(None, description="Unique transaction ID if available")
    text: Optional[str] = Field(None, description="Original transaction text line from statement")