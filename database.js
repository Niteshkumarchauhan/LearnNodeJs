const mongoose = require("mongoose")

const connectToMongo = ()=>{
    mongoose.connect("mongodb+srv://chauhannitesh19:Ultimate%40007@cluster0.d6b6cec.mongodb.net/")
    .then(()=>{
        console.log("Database has been connected successfully!");
    })
    .catch((error)=>{
        console.log("Unable to connet to database : "+error);
    })
}

module.exports = connectToMongo