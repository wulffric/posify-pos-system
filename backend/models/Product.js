const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    barcode: {
        type: String,
        required: true,
        unique: true
    },

    price: {
        type: Number,
        required: true
    },

    stock_quantity: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Product", ProductSchema);