const express = require("express");
const { product } = require("puppeteer");
const productRouter = express.Router();
const productController = require("../controllers/ProductControllers");

//Product Routers:

<<<<<<< HEAD
productRouter.get(
  "/products/priceHistory/:id",
  productController.getPriceHistory,
  (req, res) => {
    res.status(200).json({ priceHistory: res.locals.priceHistory });
=======
//Update the daily price for all products in database
//GET request
productRouter.get(
  "/products/updatePricing",
  productController.updateTimestamp,
  productController.filterTimes,
  (req, res) => {
    res.status(200).json({ updated: res.locals.timestamp });
>>>>>>> ca25dd0f321cf40f2bc9b73cda064068bb271ffd
  }
);

//Get All Products:
//GET Request
productRouter.get(
  "/products/:user",
  productController.getProducts,
  (req, res) => {
    res.status(200).json({ products: res.locals.products });
  }
);

//Add One Product:
//POST Request
productRouter.post(
  "/products/:user",
  productController.addProduct,
  (req, res) => {
    res.status(200).json("Added product");
  }
);

//Delete One Product:
//DELETE Request
productRouter.delete(
  "/products/:user/:id",
  productController.deleteProduct,
  (req, res) => {
    res.status(200).json("Delete product");
  }
);

module.exports = productRouter;
