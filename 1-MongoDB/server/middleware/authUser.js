const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) return res.status(400).json({ message: "Please login to proceed!" });
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ message: "Please login to proceed!" });
            req.user = user;
            next();
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}