const usersModel = require('../models/users.model');
const crypto = require('crypto')

function hashPassword(password, salt) {
    // if needed for compare don't generate salt
    if (salt == null)
        salt = crypto
            .randomBytes(16)
            .toString('base64');
    // generate hash from password and salt
    let hash = salt + crypto
        .createHash('sha256')
        .update(salt + password)
        .digest('hex');

    return hash;
}

function comparePassHash(password, hash) {
    // take the salt from the hash 
    let salt = hash.split('==')[0];
    salt += '==';
    //create new hash of password with the salt
    let hashedPass = hashPassword(password, salt);

    return hashedPass == hash;
}

exports.post_register = (req, res) => {
    let userBody = req.body;

    userBody.password = hashPassword(userBody.password);

    let user = new usersModel(userBody);

    user.save()
        .then(() => res.status(201).json({ message: "User was created", success: true }))
        .catch((err) => {
            console.log("Error: ", err);
            res.status(400).json({ message: "server error", success: false });
        });
}

exports.post_login = (req, res) => {
    let { email, password } = req.body;

    // select name,email,password,_id from Users
    // WHERE email == users.email 
    usersModel
        .findOne({ email })
        .then((result) => {
            if (result != null) {

                let validPass = comparePassHash(password, result.password);
                if (validPass) {
                    result.password = "";
                    res.status(202).json({
                        message: "login success.",
                        success: true,
                        user: result,
                    });
                }
                else
                    res.status(402).json({
                        message: "wrong email or password",
                        success: false,
                    });
            } else {
                res.status(402).json({
                    message: "wrong email or password",
                    success: false,
                });
            }
        }).catch((err) => res.status(500).json({ message: "server error", success: false }));
}

exports.patch_update = async (req, res) => {
    try {
        userSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, user) => {
            if (err != null) {
                res.status(200).json({ message: "user has been updated", success: true, user });
            } else {
                console.log("user.controller >>> patch_update >>> find: ", err);
                res.status(500).json({ message: "server error", success: false });
            }
        });
    } catch (error) {
        console.log("user.controller >>> patch_update >>> catch: ", error);

        res.status(500).json({ message: "server error", success: false });
    }
}

exports.check_register = async (req, res) => {
    try {

        let { id, email } = req.body;
        let user1 = await usersModel.findOne({ id });
        let user2 = await usersModel.findOne({ email });

        if (user1 == null && user2 == null) {
            res.status(200).json({ success: true, message: "user doesn't exist" });
        } else {
            res.status(200).json({ success: false, message: "user exist with this id or email" });
        }

    } catch (err) {
        res.status(500).json({ success: false, message: "server error" })
    }

}