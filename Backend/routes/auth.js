const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');

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

        // Create and save the new user
        const user = new User(req.body);
        await user.save();

        res.status(201).json(user);
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
