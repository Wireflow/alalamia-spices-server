"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supplier_1 = require("../controllers/supplier");
const router = express_1.default.Router();
router.post("/suppliers", supplier_1.createSupplier);
router.put("/suppliers/:id", supplier_1.updateSupplier);
router.delete("/suppliers/:id", supplier_1.deleteSupplier);
router.get("/suppliers", supplier_1.getAllSuppliers);
router.get("/suppliers/:id", supplier_1.getSupplierById);
exports.default = router;
