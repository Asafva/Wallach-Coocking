const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler((async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}));

const getSingleProcuts = asyncHandler((async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id);
        res.status(200).json(product)
        if (!product) {
            return res.status(404).json({ message: `cannot find ID:${id}` });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}));

const addNewProduct = asyncHandler((async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        console.log(req.body)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}));

const editProduct = asyncHandler((async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: `cannot find ID:${id}` });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}));

const deleteProduct = asyncHandler((async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `cannot find ID:${id}` });
        }
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }

}));

module.exports = {
    getProducts,
    getSingleProcuts,
    addNewProduct,
    editProduct,
    deleteProduct
}