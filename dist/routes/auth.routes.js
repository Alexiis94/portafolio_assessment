"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.post("/signup", user_controller_1.singUp);
router.post("/signin", user_controller_1.singIn);
router.get(`/deleteUser`, user_controller_1.deleteUser);
exports.default = router;
