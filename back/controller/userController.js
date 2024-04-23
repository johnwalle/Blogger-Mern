const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const User = require('../model/usermodel')
const path = require('path');
const fs = require('fs');


// registering user
// post : api/usres
const creatingUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Get the file path of the uploaded image


    try {

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields.' });
        }

        // Check if the user is already registered
        const emailExist = await User.findOne({ email });

        if (emailExist) {
            return res.status(400).json({ message: 'User already registered.' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,

        });

        return res.status(200).json({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: genToken(newUser._id),
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error while creating the user.' });
    }
};



// login user
// post: api/users/login

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if all the fields are filled
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields.' });
        }

        // Check if the email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email.' });
        }

        // Check if the password is correct
        const checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) {
            return res.status(400).json({ message: 'Invalid password.' });
        }

        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: genToken(user._id),
            posts : user.posts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Login failed.' });
    }
};



// getting all users
// get : api/users

const gettingAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find().sort({ createdAt: -1 }).select('-password');
        return res.status(200).json(allUsers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error while getting all users.' });
    }
};


// getting users by id
// get: api/users/:id

const gettingUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id).select("-password");
        return res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: 'error while finding the user.' });
        console.error(error);
    }
}


const editUser = async (req, res) => {
    try {
        const { name, email, currentPassword, newPassword, confirmNewPassword } = req.body;

        if (!name || !email || !currentPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({ message: "Please fill all the fields." });
        }

        // check if the email already exists
        const existUser = await User.findOne({ email });

        if (existUser && existUser._id.toString() !== req.user._id.toString()) {
            return res.status(400).json({ message: "Email already exists." });
        }

        // find the user
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // check if the old password is correct
        const checkPass = await bcrypt.compare(currentPassword, user.password);

        if (!checkPass) {
            return res.status(400).json({ message: 'Invalid password.' });
        }

        // check if the new passwords match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "The new passwords do not match." });
        }

        // hashing the new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // updating the user info
        user.name = name;
        user.email = email;
        user.password = hashedNewPassword;

        await user.save();

        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            posts: user.posts,
            token: genToken(user._id)
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while updating the user info." });
    }
};

// changing avatar
 
const changeAvatar = async (req, res) => {
    try {
        // Check if an image was uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No avatar uploaded." });
        }

        // Get the file path of the uploaded image
        const imagePath = req.file.filename;


        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { avatar: imagePath },
            { new: true }
        );
        return res.status(200).json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            token: genToken(updatedUser._id),
        }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to create post." });
    }
};







// GENERATE TOKEN
const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    creatingUser,
    loginUser,
    gettingAllUsers,
    gettingUserById,
    editUser,
    changeAvatar
}

