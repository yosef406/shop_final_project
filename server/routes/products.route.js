// imports
const express = require('express');
// setups
const productsRoute = express.Router();
const productsModel = require("../models/product.model");
const ordersModel = require("../models/order.model");
const orderModel = require('../models/order.model');


// get all products
productsRoute.get("/all", (req, res) => {
    productsModel.find()
        .then((result) => {
            if (result != null)
                res.status(200).json({ success: true, message: "found products", products: result });
            else
                res.status(500).json({ success: false, message: "server error" })

        }).catch((error) => {
            console.log("Error: ", error);
            res.status(500).json({ success: false, message: "server error" })
        })
});

productsRoute.get("/featured", async (req, res) => {
    try {
        let productCount = await productsModel.count()
        let orderCount = await ordersModel.count();
        let product = await productsModel.findOne();
        let imageData = ""
        if (product != null) {
            imageData = product.image
        }

        res.status(200).json({ success: true, message: "found featured", result: { productCount, orderCount, imageData } })
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ success: false, message: "server error" })
    }
});

// get products by category
productsRoute.get("/filter/:category", (req, res) => {
    productsModel.find({ category: req.params.category })
        .then((result) => {
            if (result == null)
                res.status(200).json({ success: true, message: "found products", products: result });
            else
                res.status(500).json({ success: false, message: "server error" })

        }).catch((error) => {
            console.log("Error: ", error);
            res.status(500).json({ success: false, message: "server error" })
        })
});

productsRoute.post("/new", async (req, res) => {
    try {
        let { name, image, price, category } = req.body;

        let newProduct = await productsModel.create({ name, image, price, category });
        if (newProduct != null) {
            res.status(200).json({ success: true, message: "product added", newProduct });
        } else {
            res.status(500).json({ success: false, message: "server error" })
        }
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ success: false, message: "server error" })
    }
});


module.exports = productsRoute;