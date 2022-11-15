// imports
const express = require('express');
// setups
const categoryRoute = express.Router();
const categoryModel = require("../models/category.model");

// add a new category
categoryRoute.post("/", (req, res) => {
    categoryModel.create(req.body).then((result) => {
        if (result) {
            res.status(200).json({ success: true, message: "category created", result });
            return;
        }
        else {
            res.status(500).json({ success: false, message: "creation failed" });
            return;
        }
    }).catch((error) => {
        console.log("Error: ", error);
        res.status(500).json({ success: false, message: "server error" })
    });
})

// get all categories
categoryRoute.get("/", (req, res) => {
    categoryModel.find().then((result) => {
        if (result) {
            res.status(200).json({ success: true, message: "categories found", result });
            return;
        }
        else {
            res.status(500).json({ success: false, message: "cant find categories" });
            return;
        }
    }).catch((error) => {
        console.log("Error: ", error);
        res.status(500).json({ success: false, message: "server error" })
    });
})



module.exports = categoryRoute;