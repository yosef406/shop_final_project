// imports
const express = require('express');
const cartModel = require("../models/cart.model");
const orderModel = require("../models/order.model");
const controller = require("../controllers/cart.controller");

// setups
const cartRoute = express.Router();

// create a new cart for user
cartRoute.post("/new/:id", async (req, res) => {
    try {
        let cart = new cartModel({
            user_id: req.params.id,
        });
        await cart.save();
        res.status(200).json({ success: true, message: "cart created", cart })
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ success: false, message: "server error" })
    }
});

// close an open cart for user
cartRoute.post("/order/:cartId", async (req, res) => {
    try {
        let cart = await cartModel.findById(req.params.cartId)
        cart.open = false;

        let order = new orderModel({
            ...req.body,
            user_id: cart.user_id,
            cart_id: cart._id,
            final_price: cart.total_price,
        });
        await order.save();
        await cart.save();
        res.status(200).json({ success: true, message: "cart closed" })
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ success: false, message: "server error" })
    }
});

// TODO: close cart (delete)

// get open carts for user
cartRoute.get("/open/:id", async (req, res) => {
    try {
        let cart = await cartModel.findOne({ user_id: req.params.id, open: true })
        if (cart != null) {
            res.status(200).json({ success: true, message: "found open cart", cart });
            return;
        }
        let order = await orderModel.findOne({ user_id: req.params.id }).sort({ order_date: -1 });
        if (order !== null) {
            res.status(200).json({ success: true, message: "found last order", order: order });
            return;
        }
        res.status(200).json({ success: true, message: "no open carts or orders" });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ success: false, message: "server error" });
    }
});

// add a product to an open cart
cartRoute.post("/add-product/:cartId", controller.addProduct);

// remove a product from an open cart
cartRoute.post("/remove-product/:cartId", controller.removeProduct);

module.exports = cartRoute;