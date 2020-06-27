import Transaction from '../models/Transaction';
// import Balance from '../models/Balance';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  getTransactionValueByType(type: string): number {
    const value = this.transactions.reduce((accumulator, transaction) => {
      return transaction.type === type
        ? accumulator + transaction.value
        : accumulator;
    }, 0);

    return value;
  }

  public all(): TransactionDTO {
    const balance = this.getBalance();

    const transactions = {
      transactions: this.transactions,
      balance,
    };

    return transactions;
  }

  public getBalance(): Balance {
    const income = this.getTransactionValueByType('income');
    const outcome = this.getTransactionValueByType('outcome');
    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
