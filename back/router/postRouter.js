// routes/fileRoutes.js
const express = require('express');
const multer = require('multer');
const {
    createPost, getAllPosts, categoryPosts, singlePost, authorPosts, deletePost, editPost
} = require('../controller/postController');
const authMiddleware = require("../middleware/authMiddleware");


const postRouter = express.Router();


// Initialize the upload variable
const upload = multer();

// File upload route
postRouter.post('/create', authMiddleware, upload.single('image'), createPost);
postRouter.put('/edit-post/:postID', authMiddleware, upload.single('image'), editPost);
postRouter.delete('/delete-post/:postID', authMiddleware, deletePost);
postRouter.get("/", getAllPosts)
postRouter.get('/categories/:category', categoryPosts)
postRouter.get('/user/:author', authorPosts)
postRouter.get("/:postID", singlePost)



module.exports = { postRouter } 
