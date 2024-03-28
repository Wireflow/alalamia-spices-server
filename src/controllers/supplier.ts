import { Request, Response } from "express";
import prisma from "../prisma/connection";
import { SupplierSchema } from "../types/supplier";
import { boolean } from "zod";
import { Prisma } from "@prisma/client";

const createSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = SupplierSchema.safeParse(req.body);

    if (!supplier.success)
      return res.status(405).json({ message: "Invalid Request Data" });

    const newSupplier = await prisma.supplier.create({
      data: {
        ...supplier.data,
      },
    });

    res
      .status(200)
      .json({ message: "Supplier created successfully", data: newSupplier });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = req.body;
    const { id } = req.params;

    if (!supplier || !id)
      return res.status(405).json({ message: "Invalid Request Data" });

    const updatedSupplier = await prisma.supplier.update({
      where: { id },
      data: {
        ...supplier,
      },
    });

    if (!updateSupplier) return res.json({ message: "Supplier not found" });

    res.status(200).json({ message: "Supplier updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllSuppliers = async (req: Request, res: Response) => {
  try {
    const { products, sort } = req.query;

    const sortBy: Prisma.SortOrder = sort ? (sort as Prisma.SortOrder) : "desc";

    const suppliers = await prisma.supplier.findMany({
      include: {
        products: products ? true : false,
      },
      orderBy: {
        createdAt: sortBy,
      },
    });

    res
      .status(200)
      .json({ message: "Suppliers got successfully", data: suppliers });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSupplierById = async (req: Request, res: Response) => {
  try {
    const { products } = req.query;
    const { id } = req.params;
    if (!id) return res.status(405).json({ message: "Invalid Request Data" });

    const supplier = await prisma.supplier.findFirst({
      where: {
        id,
      },
      include: {
        products: products ? true : false,
      },
    });

    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });

    res
      .status(200)
      .json({ message: "Supplier found successfully", data: supplier });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(405).json({ message: "Invalid Request Data" });

    const deleteSupplier = await prisma.supplier.delete({
      where: {
        id,
      },
    });

    if (!deleteSupplier)
      return res.status(404).json({ message: "Supplier not found" });

    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
};
