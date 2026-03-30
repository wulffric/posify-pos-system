const mongoose = require("mongoose");

<<<<<<< HEAD
const transactionSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  paymentType: {
    type: String,
    enum: ["cash", "card"],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
=======
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
>>>>>>> d15e768 (Iteration 2 backend complete: login, role management, refund, user control)
