const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  addProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  getSupplierOrders,
  updateOrderStatus
} = require("../controllers/supplier.controller");

router.get("/me", verifyToken, (req, res) => {
  if (req.user.role !== "supplier") {
    return res.status(403).json({ message: "Access denied" });
  }
  res.json(req.user);
});
router.post("/products", verifyToken, addProduct); 
router.get("/products", verifyToken, getMyProducts); 
router.put("/products/:productId", verifyToken, updateProduct); 
router.delete("/products/:productId", verifyToken, deleteProduct); 
router.get("/orders", verifyToken, getSupplierOrders)
router.put("/orders/:id/status", verifyToken, updateOrderStatus)

module.exports = router;