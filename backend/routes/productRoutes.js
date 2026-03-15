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