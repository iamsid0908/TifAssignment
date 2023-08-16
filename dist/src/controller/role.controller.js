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
const role_models_1 = __importDefault(require("../models/role.models"));
exports.getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // we can take input from query as well
        const page = 1; // Get the page number from the query parameter
        const limit = 20; // Set a default limit or get the limit from the query parameter
        const skip = (page - 1) * limit;
        const role = yield role_models_1.default.find({}).skip(skip).limit(limit);
        res.status(200).json({
            success: true,
            content: {
                meta: {
                    page: page,
                    pages: limit,
                    total: role.length
                }
            },
            role
        });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
exports.createRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield role_models_1.default.create(req.body);
        res.status(201).json({
            success: true,
            content: {
                data
            }
        });
    }
    catch (e) {
        res.status(404).send({ message: e.message });
    }
});
