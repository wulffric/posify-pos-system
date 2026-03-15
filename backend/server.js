const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/*
MongoDB Atlas connection
*/
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Atlas connected");
})
.catch((err) => {
    console.log("MongoDB connection error:", err.message);
});

/*
Routes
*/
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", paymentRoutes);

app.get("/", (req, res) => {
    res.send("POSify backend running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});