import { Request, Response } from "express";
import { ProductSchema } from "../types/product";
import prisma from "../prisma/connection";
import calculatePagination from "../utils/calculatePagination";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = ProductSchema.safeParse(req.body);

    if (!product.success) return res.json("Invalid Request Data").status(405);

    const newMember = await prisma.product.create({
      data: {
        ...product.data,
        productCategoryId: product.data.categoryId,
        supplierId: product.data.supplierId,
      },
    });

    res.status(200).json(newMember);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const { id } = req.params;

    if (!product || !id) return res.json("Invalid Request Data").status(405);

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...product,
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const { skip, take } = calculatePagination({
      page: Number(page),
      pageSize: Number(pageSize),
    });

    const products = await prisma.product.findMany({
      take,
      skip,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(405).json("Invalid Product Request");

    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(405).json("Invalid Transaction Request");

    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    });

    res.status(200).json(deletedProduct);
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
