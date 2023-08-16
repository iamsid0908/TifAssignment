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
exports.getCommunityInfo = exports.getRoleInfo = exports.getUserInfo = void 0;
const user_models_1 = __importDefault(require("../src/models/user.models"));
const role_models_1 = __importDefault(require("../src/models/role.models"));
const community_models_1 = __importDefault(require("../src/models/community.models"));
function getUserInfo(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_models_1.default.findOne({ _id: userId });
        return {
            id: user === null || user === void 0 ? void 0 : user._id.toString(),
            name: user === null || user === void 0 ? void 0 : user.name
        };
    });
}
exports.getUserInfo = getUserInfo;
function getRoleInfo(roleId) {
    return __awaiter(this, void 0, void 0, function* () {
        const role = yield role_models_1.default.findOne({ _id: roleId });
        return {
            id: role === null || role === void 0 ? void 0 : role._id.toString(),
            name: role === null || role === void 0 ? void 0 : role.name
        };
    });
}
exports.getRoleInfo = getRoleInfo;
function getCommunityInfo(communityId) {
    return __awaiter(this, void 0, void 0, function* () {
        const community = yield community_models_1.default.findOne({ _id: communityId });
        return {
            id: community === null || community === void 0 ? void 0 : community.id.toString(),
            name: community === null || community === void 0 ? void 0 : community.name,
            slug: community === null || community === void 0 ? void 0 : community.slug
        };
    });
}
exports.getCommunityInfo = getCommunityInfo;
