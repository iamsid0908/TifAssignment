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
const community_models_1 = __importDefault(require("../models/community.models"));
const member_models_1 = __importDefault(require("../models/member.models"));
const helper_1 = require("../../utils/helper");
exports.createCommunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const community = new community_models_1.default({
            name: req.body.name,
            slug: req.body.name,
            owner: req.user.id
        });
        community.save();
        res.status(200).json({
            success: true,
            content: {
                data: community
            }
        });
    }
    catch (_a) {
        res.status(500).send("someting went wrong in creating community");
    }
});
exports.getAllCommunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = 1; // Get the page number from the query parameter
        const limit = 2; // Set a default limit or get the limit from the query parameter
        const skip = (page - 1) * limit;
        const communities = yield community_models_1.default.find({}).skip(skip).limit(limit);
        res.status(200).json({
            success: true,
            content: {
                meta: {
                    page: page,
                    pages: limit,
                    total: communities.length
                }
            },
            data: communities
        });
    }
    catch (_b) {
        res.status(500).json({ error: 'An error occurred while fetching communities' });
    }
});
exports.getAllMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const member = yield member_models_1.default.find({ community: req.params.id });
        const transformedData = yield Promise.all(member.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            return ({
                id: item._id.toString(),
                community: item.community.toString(),
                user: yield (0, helper_1.getUserInfo)(item.user),
                role: yield (0, helper_1.getRoleInfo)(item.role),
                created_at: item.createdAt
            });
        })));
        res.status(200).json({
            success: true,
            data: transformedData
        });
    }
    catch (_c) {
        res.status(500).send("something went wrong getting data");
    }
});
exports.getMyOwnCommunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // we can take these data from query as well
        const page = 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const userId = req.user.id;
        const community = yield community_models_1.default.find({ owner: userId }).skip(skip).limit(limit);
        res.status(200).json({
            success: true,
            content: {
                meta: {
                    page: page,
                    pages: limit,
                    total: community.length
                }
            },
            data: community
        });
    }
    catch (_d) {
        res.status(500).json({ error: 'An error occurred while fetching my communities' });
    }
});
exports.getMyJoinCommunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const member = yield member_models_1.default.find({ user: req.user.id }).skip(skip).limit(limit);
        const transformedData = yield Promise.all(member.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            return ({
                id: item._id.toString(),
                community: yield (0, helper_1.getCommunityInfo)(item.community),
                user: yield (0, helper_1.getUserInfo)(item.user),
                created_at: item.createdAt
            });
        })));
        res.status(200).json({
            success: true,
            content: {
                meta: {
                    page: page,
                    pages: limit,
                    total: member.length
                }
            },
            data: transformedData
        });
    }
    catch (_e) {
        res.status(500).json({ error: 'An error occurred while fetching membered community' });
    }
});
