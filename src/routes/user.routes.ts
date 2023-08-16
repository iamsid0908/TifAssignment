const UserController =require("../controller/user.controller")
import {Express} from "express"
const {isAuthenticated} =require("../../utils/auth")

module.exports = (app:Express)=>{
    app.post("/v1/auth/singup",UserController.addSignUp)
    app.post("/v1/auth/singin",UserController.addSignIn)
    app.get("/v1/auth/logout",UserController.userLogout)
    app.get("/v1/auth/me",isAuthenticated, UserController.getUserDetails)
}