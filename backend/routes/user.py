import json
from fastapi import APIRouter
from backend.models.account import Account
from backend.models.transaction import Transaction
from backend.models.user import User

user_router = APIRouter()

@user_router.get("/user")
def get_user():
    with open('backend/jsons/statement.json', 'r') as file:
        data = json.load(file)
        account_data = data["accounts"][0]
        transactions_data = account_data.get("transactions", [])
        account=Account(
                account_number=data["account_number"],
                account_holder_name=data["account_holder_name"],
                account_holder_address=data["account_holder_address"],
                bank_name=data["bank_name"],
                beginning_balance=data["beginning_balance"],
                ending_balance=data["ending_balance"],
                period_start_date=data["period_start_date"],
                period_end_date=data["period_end_date"],
                statement_date=data["statement_date"]
            )
        transaction_objects = []
        for trans_data in transactions_data:
            transaction = Transaction(
                **trans_data
            )  # Create Transaction object from dict
            transaction_objects.append(transaction)

        user = User(
            user_id=data["account_number"],
            account_info=account,
            transactions=transaction_objects
        )

        return {
            "user": user.model_dump_json(),
            "status": 200,
            "message": "success"
        }
