const app = require("./src/app");
const connectDB = require("./src/db/db");
require("dotenv").config()
const path = require("path");
const express = require("express")


connectDB()
app.use(express.static(path.join(__dirname,"..", "frontend")));
app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})