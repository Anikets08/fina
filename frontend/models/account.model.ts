interface Account {
  account_number?: string;
  account_holder_name?: string;
  account_holder_address?: string;
  bank_name?: string;
  beginning_balance?: number;
  ending_balance?: number;
  period_start_date?: string;
  period_end_date?: string;
  statement_date?: string;
}

export default Account;
