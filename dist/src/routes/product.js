"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const router = express_1.default.Router();
router.post("/products", product_1.createProduct);
router.get("/products/:id", product_1.getProductById);
router.get("/products", product_1.getAllProducts);
router.put("/products/:id", product_1.updateProduct);
router.delete("/products/:id", product_1.deleteProduct);
exports.default = router;
