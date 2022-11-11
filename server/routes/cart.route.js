// imports
const express = require('express');


// setups
const cartRoute = express.Router();

cartRoute.use(express.json());

// get cart by user id
cartRoute.get("/all/:id", (req, res) => { });



// crate cart for user
cartRoute.post("/new/:id", (req, res) => { });

module.exports = cartRoute;