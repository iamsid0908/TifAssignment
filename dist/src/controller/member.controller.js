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
exports.addMember = void 0;
const member_models_1 = __importDefault(require("../models/member.models"));
const member_models_2 = __importDefault(require("../models/member.models"));
const addMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const member = new member_models_1.default({
            community: req.body.community,
            user: req.body.user,
            role: req.body.role
        });
        member.save();
        res.status(200).json({
            success: true,
            content: {
                data: member
            }
        });
    }
    catch (e) {
        res.status(500).send({ message: e.message });
    }
});
exports.addMember = addMember;
exports.deleteMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const member = yield member_models_1.default.findByIdAndRemove(req.params.id);
        res.status(200).json({
            sucess: true,
        });
    }
    catch (err) {
        return res.status(400).json({
            sucess: false,
            message: err.message
        });
    }
});
exports.getAllMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const member = yield member_models_2.default.find({});
        res.status(200).json({
            success: true,
            member
        });
    }
    catch (_a) {
    }
});
