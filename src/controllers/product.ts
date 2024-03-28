import { Request, Response } from "express";
import { ProductSchema } from "../types/product";
import prisma from "../prisma/connection";
import calculatePagination from "../utils/calculatePagination";
import { Prisma } from "@prisma/client";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = ProductSchema.safeParse(req.body);

    if (!product.success)
      return res.status(405).json({ message: "Invalid Request Data" });

    const newProduct = await prisma.product.create({
      data: {
        ...product.data,
        supplierId: product.data.supplierId,
      },
    });

    res
      .status(200)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const { id } = req.params;

    if (!product || !id)
      return res.status(405).json({ message: "Invalid Request Data" });

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...product,
      },
    });

    if (!updateProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, pageSize = 10, sort } = req.query;
    const { supplier } = req.query;
    const { skip, take } = calculatePagination({
      page: Number(page),
      pageSize: Number(pageSize),
    });

    const sortBy: Prisma.SortOrder = sort ? (sort as Prisma.SortOrder) : "desc";

    const products = await prisma.product.findMany({
      take,
      skip,
      include: {
        supplier: supplier ? true : false,
      },
      orderBy: {
        createdAt: sortBy,
      },
    });

    res
      .status(200)
      .json({ message: "Products got successfully", data: products });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { supplier } = req.query;
    if (!id)
      return res.status(405).json({ message: "Invalid Product Request" });

    const product = await prisma.product.findFirst({
      where: {
        id,
      },
      include: {
        supplier: supplier ? true : false,
      },
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res
      .status(200)
      .json({ message: "Product found successfully", data: product });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(405).json({ message: "Invalid Product Request" });

    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    });

    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
};
