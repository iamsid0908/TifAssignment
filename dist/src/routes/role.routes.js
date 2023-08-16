"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoleController = require("../controller/role.controller");
module.exports = (app) => {
    app.get("/v1/api/role", RoleController.getAllRoles);
    app.post("/v1/api/role", RoleController.createRoles);
};
