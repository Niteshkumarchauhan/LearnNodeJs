const express = require("express")
const conectToMongo = require("./database") 
// const bcrypt = require("bcrypt");
const app = express()
const port = 9000
app.use(express.json())
conectToMongo()

// Routes
app.use("/api/v1/auth", require("./routes/auth"))

app.listen(port, (req, res)=>{
    console.log(`App started on : localhost:${port}`);
})