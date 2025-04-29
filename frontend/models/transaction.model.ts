interface Transaction {
  order: number;
  balance?: number;
  card_number?: string;
  credit_amount?: number;
  debit_amount?: number;
  date: string; // Format: YYYY-MM-DD
  posted_date?: string;
  description: string;
  transaction_id?: string;
  text?: string;
}

export default Transaction;
