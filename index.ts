import mongoose from "mongoose";
const express= require("express")
const bodyParser=require("body-parser")
const cors=require("cors")
const app=express();
require('dotenv').config()
const cookieParser = require("cookie-parser");
import globalRouter from "./src/routes";

mongoose.connect("mongodb+srv://siddharthchandrakar007:sid@cluster0.frfuw5a.mongodb.net/")
const db=mongoose.connection
db.on("open",()=>{
    console.log("connected")
})
db.on("error",()=>{
    console.log("dis-connected");
})

app.use(cors({
    origin:'*'
}))
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());


app.use('/v1', globalRouter)

app.listen(process.env.PORT,()=>{
    console.log("server is running on "+process.env.PORT)
})