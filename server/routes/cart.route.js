// imports
const express = require('express');


// setups
const cartRoute = express.Router();

cartRoute.use(express.json());

// get cart by user id
cartRoute.get("/:id", (req, res) => { });

// get cart by user id and cart number
cartRoute.get("/:id/:cart", (req, res) => { });

// add product to cart by user id and cart number
cartRoute.post("/:id/:cart", (req, res) => { });



module.exports = cartRoute;