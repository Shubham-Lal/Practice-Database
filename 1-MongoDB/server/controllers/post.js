const Post = require('../models/post.js');

exports.fetchPosts = async (req, res) => {
    try {
        return res.status(200).json({ success: true, msg: "Operation allowed!" });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Something went wrong! Try again later..." });
    }
};

exports.createPost = async (req, res) => {
    try {
        const post = await new Post(req.body).save();
        await post.populate("user", "name username");
        return res.status(200).json({ success: true, msg: "Posted successfully!", post });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Something went wrong! Try again later..." });
    }
};