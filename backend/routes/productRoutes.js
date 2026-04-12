const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

/*
Add new product
*/
router.post("/addNew", async (req, res) => {

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

//Get all products
router.get("/all", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error("Error fetching all products:", error.message);
        res.status(500).json({
            error: "Server error",
            details: error.message
        });
    }
});

/*
Get product by barcode
*/
router.get("/barcode/:code", async (req, res) => {

    try {
        console.log("Fetching product with barcode:", req.params.code);
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
        console.error("Error fetching product by barcode:", error.message);
        res.status(500).json({
            error: "Server error",
            details: error.message
        });

    }

});

//Get product by id
router.get("/:id", async (req, res) => {
    try {
        console.log("Fetching product with ID:", req.params.id);
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }
        res.json(product);
    } catch (error) {
        console.error("Error fetching product by ID:", error.message);
        res.status(500).json({
            error: "Server error",
            details: error.message
        });
    }
});

//Update product by id
router.put("/:id", async (req, res) => {
    try {
        const { name, price, barcode, stock_quantity } = req.body;
        console.log("Updating product ID:", req.params.id, "with data:", { name, price, barcode, stock_quantity });
        
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, barcode, stock_quantity },
            { new: true }
        );
        
        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }
        
        res.json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({
            error: "Error updating product",
            details: error.message
        });
    }
});

//Delete product by id
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }
        
        res.json({
            message: "Product deleted successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            error: "Error deleting product"
        });
    }
});

module.exports = router;