"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getAllProducts = exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const product_1 = require("../types/product");
const connection_1 = __importDefault(require("../prisma/connection"));
const calculatePagination_1 = __importDefault(require("../utils/calculatePagination"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = product_1.ProductSchema.safeParse(req.body);
        if (!product.success)
            return res.status(405).json({ message: "Invalid Request Data" });
        const newProduct = yield connection_1.default.product.create({
            data: Object.assign(Object.assign({}, product.data), { supplierId: product.data.supplierId }),
        });
        res
            .status(200)
            .json({ message: "Product created successfully", data: newProduct });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const { id } = req.params;
        if (!product || !id)
            return res.status(405).json({ message: "Invalid Request Data" });
        const updatedProduct = yield connection_1.default.product.update({
            where: { id },
            data: Object.assign({}, product),
        });
        if (!updateProduct)
            return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product updated successfully" });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateProduct = updateProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, pageSize = 10 } = req.query;
        const { supplier } = req.query;
        const { skip, take } = (0, calculatePagination_1.default)({
            page: Number(page),
            pageSize: Number(pageSize),
        });
        const products = yield connection_1.default.product.findMany({
            take,
            skip,
            include: {
                supplier: supplier ? true : false,
            },
        });
        res
            .status(200)
            .json({ message: "Products got successfully", data: products });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { supplier } = req.query;
        if (!id)
            return res.status(405).json({ message: "Invalid Product Request" });
        const product = yield connection_1.default.product.findFirst({
            where: {
                id,
            },
            include: {
                supplier: supplier ? true : false,
            },
        });
        if (!product)
            return res.status(404).json({ message: "Product not found" });
        res
            .status(200)
            .json({ message: "Product found successfully", data: product });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getProductById = getProductById;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(405).json({ message: "Invalid Product Request" });
        const deletedProduct = yield connection_1.default.product.delete({
            where: {
                id,
            },
        });
        if (!deletedProduct)
            return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deleteProduct = deleteProduct;
