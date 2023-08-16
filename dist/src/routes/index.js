"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_routes_1 = __importDefault(require("./member.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const role_routes_1 = __importDefault(require("./role.routes"));
const community_routes_1 = __importDefault(require("./community.routes"));
const globalRouter = (0, express_1.Router)();
globalRouter.use("/api", member_routes_1.default);
globalRouter.use("/auth", user_routes_1.default);
globalRouter.use("/api", role_routes_1.default);
globalRouter.use("/api", community_routes_1.default);
exports.default = globalRouter;
