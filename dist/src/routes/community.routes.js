"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommunityController = require("../controller/community.controller");
const { isAuthenticated } = require("../../utils/auth");
module.exports = (app) => {
    app.get("/v1/community", CommunityController.getAllCommunity);
    app.post("/v1/community", isAuthenticated, CommunityController.createCommunity);
    app.get("/v1/community/:id/members", CommunityController.getAllMembers);
    app.get("/v1/community/me/owner", isAuthenticated, CommunityController.getMyOwnCommunity);
    app.get("/v1/community/me/member", isAuthenticated, CommunityController.getMyJoinCommunity);
};
