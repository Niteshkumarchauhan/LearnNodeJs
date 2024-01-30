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
routes.post("/get-user", async (req, res)=>{
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


module.exports = routes