const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

/*
Add new product
*/
router.post("/products", async (req, res) => {

    const { name, price, barcode, stock_quantity } = req.body;

    if (!name || !price || !barcode) {
        return res.status(400).json({
            error: "Name, price and barcode are required"
        });
    }

    try {

        const existingProduct = await Product.findOne({
            barcode: barcode
        });

        if (existingProduct) {
            return res.status(400).json({
                error: "Duplicate barcode detected"
            });
        }

        const product = new Product({
            name,
            price,
            barcode,
            stock_quantity
        });

        await product.save();

        res.json({
            message: "Product added successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            error: "Error adding product"
        });

    }

});


/*
Get product by barcode
*/
router.get("/products/barcode/:code", async (req, res) => {

    try {

        const product = await Product.findOne({
            barcode: req.params.code
        });

        if (!product) {

            return res.status(404).json({
                error: "Invalid barcode"
            });

        }

        res.json(product);

    } catch (error) {

        res.status(500).json({
            error: "Server error"
        });

    }

});

module.exports = router;

// CA2 - Remove product from cart
router.delete('/cart/:productId', (req, res) => {
  const { productId } = req.params;

  // Example logic (adjust if cart exists elsewhere)
  if (!req.app.locals.cart) {
    req.app.locals.cart = [];
  }

  let cart = req.app.locals.cart;

  const index = cart.findIndex(item => item.product_id === productId);

  if (index === -1) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  res.json({ message: "Item removed from cart", cart });
});
