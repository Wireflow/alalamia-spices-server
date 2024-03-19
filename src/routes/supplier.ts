import express, { Router } from "express";
import {
  createSupplier,
  updateSupplier,
  getAllSuppliers,
  getAllSuppliersWithProducts,
  getSupplierById,
  getSupplierByIdWithProducts,
  deleteSupplier,
} from "../controllers/supplier";
const router: Router = express.Router();

router.post("/supplier", createSupplier);
router.put("/supplier/:id", updateSupplier);
router.delete("/supplier/:id", deleteSupplier);
router.get("/suppliers", getAllSuppliers);
router.get("/suppliers/with-products", getAllSuppliersWithProducts);
router.get("/suppliers/:id", getSupplierById);
router.get("/suppliers/:id/with-products", getSupplierByIdWithProducts);

export default router;
