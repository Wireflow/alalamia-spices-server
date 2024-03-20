import express, { Router } from "express";
import {
  createSupplier,
  updateSupplier,
  getAllSuppliers,
  getSupplierById,
  deleteSupplier,
} from "../controllers/supplier";
const router: Router = express.Router();

router.post("/supplier", createSupplier);
router.put("/supplier/:id", updateSupplier);
router.delete("/supplier/:id", deleteSupplier);
router.get("/suppliers", getAllSuppliers);
router.get("/supplier/:id", getSupplierById);

export default router;
