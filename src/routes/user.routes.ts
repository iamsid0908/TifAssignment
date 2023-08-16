const UserController =require("../controller/user.controller")
import {Express,Router} from "express"
const {isAuthenticated} =require("../../utils/auth")

const userRouter = Router();


    userRouter.post("/singup",UserController.addSignUp)
    userRouter.post("/singin",UserController.addSignIn)
    userRouter.get("/logout",UserController.userLogout)
    userRouter.get("/me",isAuthenticated, UserController.getUserDetails)


export default userRouter;