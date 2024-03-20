"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandlingMiddleware(err, res) {
    res.status(err.statusCode || 500).json({
        error: err.statusMessage || "Internal Server Error",
        message: "Oops something went wrong! Please check the endpoint url and try again.",
    });
}
exports.default = errorHandlingMiddleware;
