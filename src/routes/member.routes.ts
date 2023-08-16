import {Express,Router} from "express";
const MemberController = require("../controller/member.controller");
const {isAuthenticated,authorizedRoles} =require("../../utils/auth")

const memberRouter = Router()


memberRouter.get("/member",MemberController.getAllMembers);
memberRouter.post("/member",isAuthenticated,authorizedRoles(), MemberController.addMember);
memberRouter.delete("/member/:id",MemberController.deleteMember);

export default memberRouter;
