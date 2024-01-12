const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken.js');

exports.register = async (req, res) => {
    try {
        const { name, username, password } = req.body;

        const user_exists = await User.findOne({ username });
        if (user_exists) return res.status(400).json({ success: false, msg: "Username already exists!" });

        const encryptedPassword = await bcrypt.hash(password, 12);
        await new User({
            name,
            username,
            password: encryptedPassword,
        }).save();

        return res.status(200).json({ success: true, msg: "User created. Login to proceed!" });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Something went wrong! Try again later..." });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ success: false, msg: "User doesn't exists!" });

        const verify = await bcrypt.compare(password, user.password);
        if (!verify) return res.status(400).json({ success: false, msg: "Incorrect password!" });

        const token = generateToken({ id: user._id.toString() }, "1d");
        return res.status(200).json({
            success: true,
            msg: "Login success!",
            data: {
                _id: user._id,
                name: user.name,
                token
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Something went wrong! Try again later..." });
    }
};