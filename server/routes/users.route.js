// imports
const express = require('express');
const controller = require("../controllers/users.controllers");
const middleware = require("../middleware/users.middleware");

// setups
const usersRoute = express.Router();

usersRoute.use(express.json());

// paths, methods
// user Sign In
usersRoute.post("/signin", middleware.check1, middleware.check2, controller.post_signin);
// user Sign Up
usersRoute.post("/signup", controller.post_signup);

// user Update
usersRoute.patch("/:id", middleware.getUserWithID, controller.patch_update);

// user check sign Up Data
usersRoute.post("/check-signup", middleware.check1, controller.check_signup);

module.exports = usersRoute;