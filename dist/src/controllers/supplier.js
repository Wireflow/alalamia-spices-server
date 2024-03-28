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
exports.updateSupplier = exports.getSupplierById = exports.getAllSuppliers = exports.deleteSupplier = exports.createSupplier = void 0;
const connection_1 = __importDefault(require("../prisma/connection"));
const supplier_1 = require("../types/supplier");
const createSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplier = supplier_1.SupplierSchema.safeParse(req.body);
        if (!supplier.success)
            return res.status(405).json({ message: "Invalid Request Data" });
        const newSupplier = yield connection_1.default.supplier.create({
            data: Object.assign({}, supplier.data),
        });
        res
            .status(200)
            .json({ message: "Supplier created successfully", data: newSupplier });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createSupplier = createSupplier;
const updateSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplier = req.body;
        const { id } = req.params;
        if (!supplier || !id)
            return res.status(405).json({ message: "Invalid Request Data" });
        const updatedSupplier = yield connection_1.default.supplier.update({
            where: { id },
            data: Object.assign({}, supplier),
        });
        if (!updateSupplier)
            return res.json({ message: "Supplier not found" });
        res.status(200).json({ message: "Supplier updated successfully" });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateSupplier = updateSupplier;
const getAllSuppliers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products, sort } = req.query;
        const sortBy = sort ? sort : "desc";
        const suppliers = yield connection_1.default.supplier.findMany({
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
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllSuppliers = getAllSuppliers;
const getSupplierById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products } = req.query;
        const { id } = req.params;
        if (!id)
            return res.status(405).json({ message: "Invalid Request Data" });
        const supplier = yield connection_1.default.supplier.findFirst({
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
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getSupplierById = getSupplierById;
const deleteSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(405).json({ message: "Invalid Request Data" });
        const deleteSupplier = yield connection_1.default.supplier.delete({
            where: {
                id,
            },
        });
        if (!deleteSupplier)
            return res.status(404).json({ message: "Supplier not found" });
        res.status(200).json({ message: "Supplier deleted successfully" });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deleteSupplier = deleteSupplier;
