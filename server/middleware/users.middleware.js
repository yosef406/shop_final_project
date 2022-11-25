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
    let emailRegexp = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    let passRegexp = new RegExp(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    );
    let user = { id, email, password, re_password } = req.body;
    let messing = [];
    if (!id || id == "") parameters.push("id");
    if (!email || email == "") parameters.push("email");
    if (!password || password == "") parameters.push("password");
    if (!re_password || re_password == "") parameters.push("password confirm");

    if (messing.length > 0) {
        res.status(200).json({ success: false, message: `messing parameters ${messing}` });
        return;
    }

    if (!emailRegexp.test(email)) {
        res.status(200).json({ success: false, message: "invalid email" });
        return;
    }
    if (!passRegexp.test(password)) {
        res.status(200).json({ success: false, message: "invalid password" });
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