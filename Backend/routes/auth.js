const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT_SECRET = 'your_jwt_secret_key'; // Define your JWT secret key

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

module.exports = router;
