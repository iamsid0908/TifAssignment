"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const community_models_1 = __importDefault(require("../src/models/community.models"));
const user_models_1 = __importDefault(require("../src/models/user.models"));
require('dotenv').config();
exports.isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //getting token from cookies
        const { access_token } = req.cookies;
        if (!access_token) {
            return res.status(404).send({ message: "token not found" });
        }
        // verifying the access token
        const decodedData = jwt.verify(access_token, process.env.SECRET_KEY);
        req.user = yield user_models_1.default.findById(decodedData.id);
        next();
    }
    catch (error) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
});
exports.authorizedRoles = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.id;
        console.log(userId);
        const communityId = req.body.community;
        const community = yield community_models_1.default.findById({ _id: communityId });
        const ownerId = community === null || community === void 0 ? void 0 : community.owner.toHexString();
        console.log(ownerId);
        if (userId !== ownerId) {
            return next(res.status(403).send({ message: `role: ${userId} are not allowed. you are not admin of this community` }));
        }
        next();
    });
};
