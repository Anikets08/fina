from typing import  Optional
from pydantic import BaseModel, Field

class Account(BaseModel):
    account_number: Optional[str] = Field(None, description="Account number")
    account_holder_name: Optional[str] = Field(None, description="Account holder name")
    account_holder_address: Optional[str] = Field(None, description="Account holder address")
    bank_name:Optional[str] = Field(None, description="Bank name")
    beginning_balance: Optional[float] = Field(None, description="Beginning balance")
    ending_balance: Optional[float] = Field(None, description="Ending balance")
    period_start_date: Optional[str] = Field(None, description="Start period date")
    period_end_date: Optional[str] = Field(None, description="End period date")
    statement_date: Optional[str] = Field(None, description="Statement date")