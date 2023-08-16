import {Express} from "express";
const MemberController = require("../controller/member.controller");
const {isAuthenticated,authorizedRoles} =require("../../utils/auth")

module.exports = (app:Express)=>{
    app.post("/v1/member",isAuthenticated,MemberController.addMember);
    app.delete("/v1/member/:id",MemberController.deleteMember);
}
