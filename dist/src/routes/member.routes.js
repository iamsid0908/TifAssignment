"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MemberController = require("../controller/member.controller");
const { isAuthenticated, authorizedRoles } = require("../../utils/auth");
module.exports = (app) => {
    app.post("/v1/member", isAuthenticated, MemberController.addMember);
    app.delete("/v1/member/:id", MemberController.deleteMember);
};
