const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require("../models/userModel");

router.post("/register", async (req, res) => {
    try {

        // Get information from the body
        let {
            email,
            password,
            passwordCheck,
            displayName
        } = req.body

        // Validation
        if (!email || !password || !passwordCheck)  // Required field
            return res
            .status(400)
            .json({ msg: "All fields are required." });
        if (password.length < 5)  // Password not less than 5 character
            return res
            .status(400)
            .json({ msg: "The password must be atleast 5 characters." });
        if (password !== passwordCheck)  // Both password field should be same
            return res
            .status(400)
            .json({ msg: "Both password should be same." });

        // Checked if user already exist
        const existingUser = await User.findOne({email: email});
        if(existingUser)
            return res
            .status(400)
            .json({ msg: "Email ID already exists." });
        
        // If no displayName set it to email
        if(!displayName) displayName = email;
        
        // Hashed the password before saving to the database
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Save new user
        const newUser = new User({ // Create new user
            email,
            password: passwordHash,
            displayName
        })
        const savedUser = await newUser.save(); // Save the user
        res.json(savedUser); // Send json response to the frontend
        } catch(err) {
            res.status(500).json({error: err.message});
        }
})

module.exports = router;