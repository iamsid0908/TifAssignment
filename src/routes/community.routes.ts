import {Express,Router} from "express";
const CommunityController = require("../controller/community.controller");
const {isAuthenticated} =require("../../utils/auth")

const communityRouter = Router()

    communityRouter.get("/community",CommunityController.getAllCommunity);
    communityRouter.post("/community",isAuthenticated, CommunityController.createCommunity);
    communityRouter.get("/community/:id/members",CommunityController.getAllMembers);
    communityRouter.get("/community/me/owner",isAuthenticated, CommunityController.getMyOwnCommunity);
    communityRouter.get("/community/me/member",isAuthenticated,CommunityController.getMyJoinCommunity);

export default communityRouter