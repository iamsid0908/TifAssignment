import mongoose from "mongoose";
const express= require("express")
const bodyParser=require("body-parser")
const cors=require("cors")
const app=express();
require('dotenv').config()
const cookieParser = require("cookie-parser");

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

require("./src/routes/role.routes")(app)
require("./src/routes/user.routes")(app)
require("./src/routes/community.routes")(app)
require("./src/routes/member.routes")(app)


app.listen(process.env.PORT,()=>{
    console.log("server is running on "+process.env.PORT)
})