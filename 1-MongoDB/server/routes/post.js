const express = require('express');
const { fetchPosts, createPost } = require('../controllers/post');
const { authUser } = require('../middleware/authUser');

const router = express.Router();

router.get('/fetch-posts', fetchPosts);
router.post('/create-post', authUser, createPost);

module.exports = router;