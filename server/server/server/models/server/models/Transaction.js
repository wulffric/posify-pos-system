class Transaction {
  constructor({ items, total, paymentType, amountPaid, change }) {
    this.id = Date.now().toString();
    this.items = items || [];
    this.total = Number(total);
    this.paymentType = paymentType || "cash";
    this.amountPaid = Number(amountPaid || 0);
    this.change = Number(change || 0);
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Transaction;
