import { TransactionItem } from './transaction-item.interface';

export interface Transaction {
  id: number;
  date: Date;
  items: TransactionItem[];
}
