const express = require("express")
const routes = express.Router()
const UserModel = require("../models/user")

// Create User
// -----------------------------------------------------
routes.post("/create-user", async (req, res)=>{
    try {

        const user = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        return res.status(200).json({
            success: true,
            message: "Account has been created successfully!",
            data: user
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error : "+error,
        })

    }
})
// -----------------------------------------------------

// Get User
// -----------------------------------------------------
routes.get("/get-user", async (req, res)=>{
    try {

        const user = await UserModel.find({email: "niteshlauda@gmail.com"})

        return res.status(200).json({
            success: true,
            message: "Users have been fetched successfully!",
            data: user
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error : "+error,
        })

    }
})
// -----------------------------------------------------

//Login User--------------------------------------------

// -----------------------------------------------------
routes.post("/login-user", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const passwordMatch = (password === user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// -----------------------------------------------------

module.exports = routes