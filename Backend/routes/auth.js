const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT_SECRET = 'your_jwt_secret_key'; // Define your JWT secret key

// Middleware to fetch user from JWT token
const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Route for creating a user
router.post('/createuser', [
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 5 }),
    body('email').isEmail()
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        console.log(req.body);

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        // Create and save the new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        // Save the user to the database
        await user.save();

        // Create JWT payload
        const data = {
            id: user.id
        };

        // Sign the JWT token
        const token = jwt.sign(data, JWT_SECRET);
        console.log(token);

        // Respond with the user object and token
        res.status(201).json({ user, token });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) { // Duplicate key error
            res.status(400).json({ error: 'Email is already in use' });
        } else {
            res.status(500).send("Server error");
        }
    }
});

// Route for authenticating a user
router.post('/login', [
    body('password').exists(),
    body('email').isEmail()
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Create JWT payload
        const data = {
            id: user.id
        };

        // Sign the JWT token
        const token = jwt.sign(data, JWT_SECRET);

        // Respond with the token
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// Route for fetching user data
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
