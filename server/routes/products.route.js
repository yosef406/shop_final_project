// imports
const express = require('express');


// setups
const productsRoute = express.Router();

productsRoute.use(express.json());

// get all products
productsRoute.get("/", (req, res) => { });

// get products by category
productsRoute.get("/:category", (req, res) => { });

module.exports = productsRoute;