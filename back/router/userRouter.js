const express = require("express");
const useRouter = express.Router();
const multer = require("multer");
const path = require("path");
const { authMiddleware } = require("../Middleware/authMiddleware");
const {
  creatingUser,
  loginUser,
  gettingAllUsers,
  gettingUserById,
  editUser,
  changeAvatar,
} = require("../controller/userController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../avatars/")); // Adjust the destination path
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Initialize the upload variable
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB (in bytes)
  },
});

useRouter.put('/change-avatar', authMiddleware, upload.single('myAvatar'), changeAvatar);
useRouter.post("/", creatingUser);
useRouter.post("/login", loginUser);
useRouter.get("/", gettingAllUsers);
useRouter.get("/:id", gettingUserById);
useRouter.put("/edit-user", authMiddleware, editUser);



module.exports = useRouter;
