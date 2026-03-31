const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],

    total: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["cash", "card"],
        required: true
    },

    status: {
        type: String,
        default: "completed"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
