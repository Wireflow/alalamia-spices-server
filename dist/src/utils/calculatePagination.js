"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculatePagination = (params) => {
    const { page, pageSize } = params;
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return { skip, take };
};
exports.default = calculatePagination;
