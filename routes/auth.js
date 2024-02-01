const express = require("express")
const routes = express.Router()
const { body, validationResult } = require('express-validator');
const UserModel = require("../models/user")
const bcrypt = require('bcryptjs');
const userModel = require("../models/user");


// Create User
// -----------------------------------------------------
routes.post("/create-user", [

    body("name").notEmpty().withMessage("Please enter a valid name."),
    body("email").isEmail().custom(async(data)=>{
        
        if(!data){
            throw new Error("Email cannot be empty")
        }else{
            const user = await UserModel.findOne({email: data})
            if(user){
                throw new Error("This email address alreasy associated with an account!")
            }
        }

        return true
    }),
    body("password").notEmpty().isLength({min: 6}).withMessage("Password cannot be less than 6 digits!")

],async (req, res)=>{
    // Get the errors from validations
    const errorResults = validationResult(req)

    if(!errorResults.isEmpty()){
        return res.status(400).json({
            status: false,
            message: "Validation error!",
            errors: errorResults
        })
    }

    try {

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        const user = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
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
routes.post("/login", [
    body("email").isEmail().custom(async(data)=>{
        const user = await UserModel.findOne({email: data})
        if(!user){
            throw new Error("This email address is not registered.")
        }
    }),
    body("password").notEmpty().isLength({min: 6}).withMessage("Password cannot be less than 6 digits!")

],async(req,res)=>{
    
    // Get the errors from validations
    const errorResults = validationResult(req)

    if(!errorResults.isEmpty()){
        return res.status(400).json({
            status: false,
            message: "Validation error!",
            errors: errorResults
        })
    }

    try {
        
        const user = await userModel.findOne({email: req.body.email})

        const checkPassword = bcrypt.compareSync(req.body.password, user.password)

        if(!checkPassword){
            return res.status(401).json({
                status: false,
                message:"Password is incorrect!"
            })
        }

        return res.status(200).json({
            status: true,
            message:"User has been logged in successfully!",
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error : "+error,
        })
    }

})
// -----------------------------------------------------

// -----------------------------------------------------
// routes.post("/login-user", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         if (!email || !password) {
//             return res.status(400).json({ message: 'Email and password are required' });
//         }
//         const user = await UserModel.findOne({ email });

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }
//         const passwordMatch = (password === user.password);

//         if (!passwordMatch) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }
//         return res.status(200).json({ message: 'Login successful', user });
//     } catch (error) {
//         console.error('Error during login:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// });

// -----------------------------------------------------

module.exports = routes