const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken")
const {getSupplierByArea,getSupplierProducts, placeOrder, getVendorOrder,getVendorProfile }= require("../controllers/vendor.controller");


router.get("/supplier",verifyToken, getSupplierByArea);
router.get("/products/:supplierId",verifyToken,getSupplierProducts)
router.post("/orders",verifyToken,placeOrder);
router.get("/orders",verifyToken,getVendorOrder);
router.get("/me", verifyToken, getVendorProfile);

module.exports = router;