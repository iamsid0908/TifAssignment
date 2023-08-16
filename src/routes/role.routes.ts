const RoleController=require("../controller/role.controller")
import {Express} from "express";

module.exports=(app:Express)=>{
    app.get("/v1/api/role",RoleController.getAllRoles)
    app.post("/v1/api/role",RoleController.createRoles)
}