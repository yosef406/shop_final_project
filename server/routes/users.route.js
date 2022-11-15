// imports
const express = require('express');
const controller = require("../controllers/users.controllers");
const middleware = require("../middleware/users.middleware");

// setups
const usersRoute = express.Router();


// paths, methods
// user LogIn
usersRoute.post("/login", controller.post_login);

// user Register
usersRoute.post("/register", middleware.check1, middleware.check2, controller.post_register);

// user Update
usersRoute.patch("/update/:id", middleware.getUserWithID, controller.patch_update);

// user check Register Data
usersRoute.post("/check-register", middleware.check1, controller.check_register);

module.exports = usersRoute;