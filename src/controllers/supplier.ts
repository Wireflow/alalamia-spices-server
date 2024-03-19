import { Request, Response } from "express";
import prisma from "../prisma/connection";
import { SupplierSchema } from "../types/supplier";
import calculatePagination from "../utils/calculatePagination";

const createSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = SupplierSchema.safeParse(req.body);

    if (!supplier.success) return res.status(405).json("Invalid Request Data");

    const newSupplier = await prisma.supplier.create({
      data: {
        ...supplier.data,
      },
    });

    res.status(200).json(newSupplier);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = req.body;
    const { id } = req.params;

    if (!supplier || !id) return res.json("Invalid Request Data").status(405);

    const updatedSupplier = await prisma.supplier.update({
      where: { id },
      data: {
        ...supplier,
      },
    });

    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await prisma.supplier.findMany();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllSuppliersWithProducts = async (req: Request, res: Response) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: {
        Products: true,
      },
    });
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSupplierById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(405).json("Invalid Supplier Request");

    const supplier = await prisma.supplier.findFirst({
      where: {
        id,
      },
    });

    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSupplierByIdWithProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(405).json("Invalid Supplier Request");

    const supplier = await prisma.supplier.findFirst({
      where: {
        id,
      },
      include: {
        Products: true,
      },
    });

    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(405).json("Invalid Supplier Request");

    const deleteSupplier = await prisma.supplier.delete({
      where: {
        id,
      },
    });

    res.status(200).json(deleteSupplier);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  createSupplier,
  updateSupplier,
  getAllSuppliers,
  getAllSuppliersWithProducts,
  getSupplierById,
  getSupplierByIdWithProducts,
  deleteSupplier,
};
