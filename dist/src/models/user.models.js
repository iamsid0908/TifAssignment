"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const validator = require("validator");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: [true, "Please enter yr name"],
        maxLength: [30, "cannot exid"],
        minLength: [4, "more than 5 char"]
    },
    email: {
        type: String,
        require: [true, "please enter your email"],
        unique: true,
        validate: [validator.isEmail, "please enter your email"]
    },
    password: {
        type: String,
        require: [true, "please enter yr password"],
        minLength: [8, "password should be more than 8 char"],
        select: false
    },
    creatdAt: {
        type: Date,
        default: Date.now
    },
});
exports.default = mongoose_1.default.model('User', UserSchema);
