"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MemberController = require("../controller/member.controller");
const { isAuthenticated, authorizedRoles } = require("../../utils/auth");
const memberRouter = (0, express_1.Router)();
memberRouter.get("/member", MemberController.getAllMembers);
memberRouter.post("/member", isAuthenticated, authorizedRoles(), MemberController.addMember);
memberRouter.delete("/member/:id", MemberController.deleteMember);
exports.default = memberRouter;
