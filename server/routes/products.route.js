// imports
const express = require('express');
// setups
const productsRoute = express.Router();
const productsSchema = require("../models/product.model");
const ordersSchema = require("../models/order.model");

productsRoute.use(express.json());

// get all products
productsRoute.get("/", (req, res) => { });

productsRoute.get("/featured", async (req, res) => {
    try {
        let productCount = await productsSchema.count()
        let orderCount = await ordersSchema.count();
        let imageData = ""

        res.status(200).json({ success: true, message: "found documents", result: { productCount, orderCount, imageData } })
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ success: false, message: "server error" })
    }

});

// get products by category
productsRoute.get("/:category", (req, res) => { });

module.exports = productsRoute;