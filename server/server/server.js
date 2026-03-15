const express = require("express");
const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "POSify backend running" });
});

app.use("/api/products", productRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
