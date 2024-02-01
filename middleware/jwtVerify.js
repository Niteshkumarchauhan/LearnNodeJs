const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user")
require('dotenv').config()

const jwtVerify = async(req, res, next)=>{
    try {
        
        const accessToken = req.headers["access-token"]
    
        if(!accessToken){
            return res.status(401).json({
                status: false,
                message: "Access token is required"
            })
        }

        const isVerified = jwt.verify(accessToken, process.env.JWT_KEY)

        const user = await userModel.findById(isVerified.user_id).select(["-password","-__v"])

        req.user = user

        next()

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Invalid access token!",
        })
    }
}

module.exports = jwtVerify