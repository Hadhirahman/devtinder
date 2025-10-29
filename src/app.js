const express = require("express");
const app = express();
const connectDB = require("./config/database")
const { adminAuth } = require("../src/middlewares/auth")
const port = 9526;
const dotenv=require("dotenv")
dotenv.config()


connectDB().
    then(() => {
        console.log("db connected success fully");
        app.listen(process.env.PORT, () => {
            console.log("server has running now");
        })
    })


    .catch((err) => {
        console.error("db not connected")
    })
