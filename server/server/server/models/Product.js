class Product {
  constructor({ name, barcode, price, quantity, category }) {
    this.id = Date.now().toString();
    this.name = name;
    this.barcode = String(barcode);
    this.price = Number(price);
    this.quantity = Number(quantity);
    this.category = category || "General";
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Product;
