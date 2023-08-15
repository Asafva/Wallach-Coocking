const express = require("express");
const router = express.Router();
const {
    getProducts,
    getSingleProcuts,
    addNewProduct,
    editProduct,
    deleteProduct
} = require("../controller/productController");

router.route("/").get(getProducts).post(addNewProduct)
router.route('/:id').get(getSingleProcuts).put(editProduct).delete(deleteProduct)

module.exports = router;