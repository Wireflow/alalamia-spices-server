import express, { Router } from "express";
import {
  createSupplier,
  updateSupplier,
  getAllSuppliers,
  getSupplierById,
  deleteSupplier,
} from "../controllers/supplier";
const router: Router = express.Router();

router.post("/suppliers", createSupplier);
router.put("/suppliers/:id", updateSupplier);
router.delete("/suppliers/:id", deleteSupplier);
router.get("/suppliers", getAllSuppliers);
router.get("/suppliers/:id", getSupplierById);

export default router;
