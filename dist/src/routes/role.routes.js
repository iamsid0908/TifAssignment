"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoleController = require("../controller/role.controller");
const express_1 = require("express");
const roleRouter = (0, express_1.Router)();
roleRouter.get("/role", RoleController.getAllRoles);
roleRouter.post("/role", RoleController.createRoles);
exports.default = roleRouter;
