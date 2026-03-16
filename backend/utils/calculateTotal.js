function calculateTotal(items) {
  if (!Array.isArray(items)) return 0;

  return items.reduce((sum, item) => {
    const price = Number(item.price || 0);
    const quantity = Number(item.quantity || 0);
    return sum + price * quantity;
  }, 0);
}

module.exports = calculateTotal;
