"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    port: process.env.PORT || 3000,
    database: {
        url: process.env.DATABASE_URL ||
            "mysql://johndoe:randompassword@localhost:5432/mydb?schema=public",
        username: "johndoe",
        password: "randompassword123",
    },
    jwtSecret: process.env.JWT_SECRET || "jkl!±@£!@ghj1wef237",
};
exports.default = config;
