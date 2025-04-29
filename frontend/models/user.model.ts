import Account from "./account.model";
import Transaction from "./transaction.model";

interface User {
  user_id: string;
  account_info: Account;
  transactions: Transaction[];
}

export default User;
