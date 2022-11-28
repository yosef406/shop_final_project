const productModel = require('../models/product.model');
const cartModel = require("../models/cart.model");

async function productController(req, res, callback) {
    try {
        let { productId } = req.body;
        if (productId == null) {
            res.status(200).json({ success: false, message: "missing product id" });
            return;
        }
        let product = await productModel.findById(productId);
        if (product == null) {
            res.status(200).json({ success: false, message: "no product found" });
            return;
        }
        let cart = await cartModel.findById(req.params.cartId)
        if (cart != null && cart.open) {
            let message = callback(cart, product);
            if (message == "product added to cart" || message == "product removed from cart") {
                await cart.save();
                res.status(200).json({ success: true, message, cart });
            } else {
                res.status(200).json({ success: false, message, cart });
            }
        } else {
            res.status(200).json({ success: false, message: "no open cart with this id" });
        }
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ success: false, message: "server error" });
    };

}

exports.addProduct = async (req, res) => {
    productController(req, res, (cart, product) => {
        cart.products.push(product._id);
        cart.total_price += product.price;
        return "product added to cart";
    });
}

exports.removeProduct = async (req, res) => {
    productController(req, res, (cart, product, message) => {
        if (cart.products.includes(product._id)) {
            let index = cart.products.indexOf(product._id);
            cart.products.splice(index, 1);
            cart.total_price -= product.price;
            return "product removed from cart";
        }
        return "product does not exist in cart";
    });
}