const RoleController=require("../controller/role.controller")
import {Express,Router} from "express";

const roleRouter = Router()


    roleRouter.get("/role",RoleController.getAllRoles)
    roleRouter.post("/role",RoleController.createRoles)

    export default roleRouter