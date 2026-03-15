const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

/*
Middleware
*/
app.use(cors());
app.use(express.json());

/*
MongoDB Connection
*/
mongoose.connect("mongodb://127.0.0.1:27017/posify")
.then(() => {
    console.log("MongoDB connected");
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

/*
Test Route
*/
app.get("/", (req, res) => {
    res.send("POSify backend running");
});

/*
Start Server
*/
app.listen(5000, () => {
    console.log("Server running on port 5000");
});