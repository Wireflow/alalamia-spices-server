import express, { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product";
const router: Router = express.Router();

router.post("/product", createProduct);
router.get("/product/:id", getProductById);
router.get("/products", getAllProducts);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
