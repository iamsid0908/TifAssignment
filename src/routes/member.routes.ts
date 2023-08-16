import {Express,Router} from "express";
const MemberController = require("../controller/member.controller");
const {isAuthenticated,authorizedRoles} =require("../../utils/auth")

const memberRouter = Router()


memberRouter.post("/member",isAuthenticated,MemberController.addMember);
memberRouter.delete("/member/:id",MemberController.deleteMember);

export default memberRouter;
