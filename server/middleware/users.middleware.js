const usersModel = require('../models/users.model');

exports.getUserWithID = async (req, res, next) => {
    try {
        let user = await usersModel.findById(req.params.id);
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.check1 = (req, res, next) => {
    let user = { id, email, password, re_password } = req.body;
    let messing = [];
    if (!id || id == "") parameters.push("id");
    if (!email || email == "") parameters.push("email");
    if (!password || password == "") parameters.push("password");
    if (!re_password || re_password == "") parameters.push("password confirm");

    if (messing.length > 0) {
        res.status(200).json({ success: false, message: "messing parameters", messing });
        return;
    }

    if (password != re_password) {
        res.status(200).json({ success: false, message: "passwords don't match" });
        return;
    }
    next();
}

exports.check2 = (req, res, next) => {
    let { city, street, first_name, last_name } = req.body;

    if (!city || !street || !first_name || !last_name) {
        res.status(200).json({ success: false, message: "messing parameters" });
        return;
    }

    next();
}