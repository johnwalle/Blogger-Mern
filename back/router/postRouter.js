// routes/fileRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const {
    createPost, getAllPosts, categoryPosts, singlePost, authorPosts, deletePost, editPost
} = require('../controller/postController');
const { authMiddleware } = require('../Middleware/authMiddleware');


const postRouter = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../uploads/')); // Adjust the destination path
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Initialize the upload variable
const upload = multer({ storage });

// File upload route
postRouter.post('/create', authMiddleware, upload.single('myImage'), createPost);
postRouter.put('/edit-post/:postID', authMiddleware, upload.single('myImage'), editPost);
postRouter.delete('/delete-post/:postID', authMiddleware, deletePost);
postRouter.get("/", getAllPosts)
postRouter.get('/categories/:category', categoryPosts)
postRouter.get('/user/:author', authorPosts)
postRouter.get("/:postID", singlePost)



module.exports = { postRouter } 
