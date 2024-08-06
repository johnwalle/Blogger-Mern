const express = require("express");
const userRouter = express.Router();
const multer = require("multer");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  creatingUser,
  loginUser,
  gettingAllUsers,
  gettingUserById,
  editUser,
  changeAvatar
} = require("../controller/userController");

const upload = multer();

// Update user avatar
userRouter.put('/avatar', authMiddleware, upload.single('avatar'), changeAvatar);

// Create a new user
userRouter.post("/", creatingUser);

// Login a user
userRouter.post("/login", loginUser);

// Get all users
userRouter.get("/", gettingAllUsers);

// Get a user by ID
userRouter.get("/:id", gettingUserById);

// Update a user
userRouter.put("/", authMiddleware, editUser);

module.exports = userRouter;