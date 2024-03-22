"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultRoute = (req, res, next) => {
    res.json({ message: "Authorized Access Only" });
};
exports.default = defaultRoute;
