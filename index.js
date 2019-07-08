/*
- Allow multiple accounts to be created
- Each account can have many transactions
- Allow withdrawals and deposits into accounts
- Allow us to retrieve the transaction history of an account (all withdrawals and deposits)
- Allow us to retreive the current balance of the account at any time
- Don't allow withdrawals that exceed the remaining balance of the account
*/

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return (this.account.balance - this.amount) >= 0;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('billybob');

let deposit200 = new Deposit(200, myAccount);
let deposit300 = new Deposit(300, myAccount);
let withdraw400 = new Withdrawal(400, myAccount);
deposit200.commit();
deposit300.commit();
withdraw400.commit();

// console.log(myAccount.transactions);
console.log(myAccount);
console.log(myAccount.balance);
