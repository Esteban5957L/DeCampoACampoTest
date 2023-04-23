const router = require("express").Router();

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controlers/products");

// Get all products
router.get("/products", getProducts);

// Create product
router.post("/products/create", createProduct);

// Update product
router.put("/products/update/:id", updateProduct);

// Delete the product
router.delete("/products/delete/:id", deleteProduct);

module.exports = router;
