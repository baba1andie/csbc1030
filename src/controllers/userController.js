// userController.js
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ where: { email } });

        if (!user || !await user.validPassword(password)) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const payload = {
            userId: user.id,
            userEmail: user.email,
            userName: user.name,
        }
        // Generate a JWT token
        const token = jwt.sign(payload, 'DoNOTDIsturb', { expiresIn: '1h' });
        res.cookie("auth-tk", token, { maxAge: 360000, httpOnly: true });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Controller method to fetch all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const createUser = async (req, res) => {
    try {
        console.log("this is userdata function");
        // Assuming the request body contains the post data
        const userData = req.body;

        // Create a new post using the Post model
        const newUser = await User.create(userData);

        // Send the newly created post as the response
        res.status(201).json(newUser);
    } catch (error) {
        // Handle any errors during the creation of the post
        res.status(500).json({ error: error.message });
    }
};

module.exports = { login, getAllUsers, createUser };
