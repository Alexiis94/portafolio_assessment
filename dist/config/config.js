"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwtSecret: process.env.JWT_SECRET || "somesecrettoken",
    DB: {
        URI: process.env.MONGODB_URI || "mongodb://localhost/api_assessment",
        USER: process.env.USER,
        PASSWORD: process.env.PASSWORD,
    },
};
