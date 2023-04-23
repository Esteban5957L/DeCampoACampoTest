const mongoose = require("mongoose");
const productSchema = require("../models/product");

//Search all products in our database
const getProducts = async (req, res) => {
  try {
    // Searches for all products in the database.
    const products = await productSchema.find();

    // Send the response with the products.
    res.json({ success: true, products });
  } catch (error) {
    // Logs the error and sends a detailed error response.
    console.error("Error trying to get the products", error);
    res.status(500).json({
      success: false,
      message: "Error trying to get the products",
      error: error.message,
    });
  }
};

//Creates a new product in the database.
const createProduct = async (req, res) => {
  try {
    // Creates a new product using the data from the request.
    const product = new productSchema({
      name: req.body.name,
      price: req.body.price,
    });

    // Saves the new product in the database.
    await product.save();

    // Sends a success response with the new product.
    res.status(201).json({
      success: true,
      message: "The product has been created successfully.",
      product,
    });
  } catch (error) {
    //Logs the error and sends a detailed error response
    console.error("Error trying to create the product:", error);
    res.status(400).json({
      success: false,
      message: "Error trying to create the product",
      error: error.message,
    });
  }
};

//Updates an existing product in the database.
const updateProduct = async (req, res) => {
  try {
    // Searches for the product by its ID in the database.
    const product = await productSchema.findById(req.params.id);

    //validation existend product
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Updates the product using the data from the request.
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;

    // Saves the changes to the product in the database.
    await product.save();

    // Send a success response with the updated product.
    res.status(200).json({
      success: true,
      message: "Product successfully updated.",
      product,
    });
  } catch (error) {
    //Logs the error and sends a detailed error response
    console.error("Error trying to update the product:", error);
    res.status(400).json({
      success: false,
      message: "Error trying to update the product.",
      error: error.message,
    });
  }
};

//Remove product from database
const deleteProduct = async (req, res) => {
  try {
    // Searches for the product by its ID in the database.
    const product = await productSchema.findById(req.params.id);
    //Coment
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Removes the product from the database.
    await product.deleteOne();

    // Sends a success response with a confirmation message.
    res.json({
      success: true,
      message: "Product successfully eliminated.",
    });
  } catch (error) {
    //Logs error and send detail response
    console.error("Error trying to delete the product:", error);
    res.status(404).json({
      success: false,
      message: "Error trying to delete the product",
      error: error.message,
    });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
