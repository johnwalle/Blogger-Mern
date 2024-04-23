const express = require('express');
const userRouter = require("./router/userRouter");
const { postRouter } = require("./router/postRouter");
const cors = require('cors')
const connectDB = require("./config/connectDB");
const path = require('path');
require("dotenv").config();
require('colors');
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

// Serve the /uploads directory as a static folder
const uploadsPath = path.join(__dirname, 'uploads');
const avatarUploadPath = path.join(__dirname, 'avatars');

app.use('/uploads', express.static(uploadsPath));
app.use('/avatars', express.static(avatarUploadPath));

// Connect with the database
connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`.cyan);
});