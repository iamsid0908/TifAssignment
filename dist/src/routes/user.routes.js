"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController = require("../controller/user.controller");
const { isAuthenticated } = require("../../utils/auth");
module.exports = (app) => {
    app.post("/v1/auth/singup", UserController.addSignUp);
    app.post("/v1/auth/singin", UserController.addSignIn);
    app.get("/v1/auth/logout", UserController.userLogout);
    app.get("/v1/auth/me", isAuthenticated, UserController.getUserDetails);
};
