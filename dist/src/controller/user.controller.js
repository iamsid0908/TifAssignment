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
const user_models_1 = __importDefault(require("../models/user.models"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.addSignUp = (req, res) => {
    const user = new user_models_1.default({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    user.save()
        .then(() => {
        // Create a payload for the JWT
        const payload = {
            userId: user._id
        };
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 86400
        });
        // Set the access token as a cookie
        res.cookie('access_token', accessToken, {
            httpOnly: true,
        }).json({
            success: true,
            meta: {
                accessToken,
            },
            content: {
                data: user
            }
        });
    })
        .catch((err) => {
        res.status(500).send({ message: err.message });
    });
};
// Signup function
exports.addSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_models_1.default.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        var isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
        }
        const payload = {
            id: user._id
        };
        var accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 86400
        });
        res.cookie('access_token', accessToken, {
            httpOnly: true,
        }).json({
            success: true,
            meta: {
                accessToken,
            },
            content: {
                data: user
            }
        });
    }
    catch (e) {
        return res.status(500).send({ message: e.message });
    }
});
exports.userLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("access_token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json({
            sucess: true,
            message: "logged out",
        });
    }
    catch (e) {
        res.status(401).json({
            sucess: false,
            message: e.message,
        });
    }
});
exports.getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_models_1.default.findById(req.user.id);
        res.status(200).json({
            sucess: true,
            content: {
                data: user
            }
        });
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
});
