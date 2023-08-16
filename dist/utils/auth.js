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
const member_models_1 = __importDefault(require("../src/models/member.models"));
const role_models_1 = __importDefault(require("../src/models/role.models"));
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
        console.log(req.user.id);
        const userId = req.user.id;
        const member = yield member_models_1.default.findOne({ user: userId });
        console.log(member);
        const roleId = member === null || member === void 0 ? void 0 : member.role;
        const role = yield role_models_1.default.findById(roleId);
        if ((role === null || role === void 0 ? void 0 : role.name) != "Community Admin") {
            return next(res.status(403).send({ message: `role: ${role === null || role === void 0 ? void 0 : role.name} are not allowed` }));
        }
        next();
    });
};
