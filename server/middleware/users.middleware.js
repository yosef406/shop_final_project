const usersSchema = require('../models/users.model');

exports.getUserWithID = async (req, res, next) => {
    try {
        let user = await usersSchema.findById(req.params.id);
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.check1 = (req, res, next) => {
    let { id, email, password, re_password } = req.body;

    if (!id || !email || !password || !re_password) {
        res.status(200).json({ success: false, message: "messing parameters" });
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