"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require('dotenv').config();
const cookieParser = require("cookie-parser");
const routes_1 = __importDefault(require("./src/routes"));
mongoose_1.default.connect("mongodb+srv://siddharthchandrakar007:sid@cluster0.frfuw5a.mongodb.net/");
const db = mongoose_1.default.connection;
db.on("open", () => {
    console.log("connected");
});
db.on("error", () => {
    console.log("dis-connected");
});
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/v1', routes_1.default);
app.listen(process.env.PORT, () => {
    console.log("server is running on " + process.env.PORT);
});
