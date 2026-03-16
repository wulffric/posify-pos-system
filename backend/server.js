const express = require("express");

const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
