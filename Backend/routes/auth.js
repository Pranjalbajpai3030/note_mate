const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT_SECRET = 'your_jwt_secret_key';

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
    body('name', 'Name must be at least 5 characters long').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;

        // Check if a user with the same email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create and save the new user
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Create JWT payload
        const data = { id: user.id };

        // Sign the JWT token
        const authToken = jwt.sign(data, JWT_SECRET);

        res.status(201).json({ success: true, authToken });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// Route for authenticating a user
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        const data = { id: user.id };
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ success: true, authToken });
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
