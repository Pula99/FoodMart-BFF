import express from "express";
import productsController from "../controllers/products.controller.js";

const router = express.Router();

router.get(`/products`, productsController.getAllProducts);
router.get(`/products/:productId`, productsController.getProductById);
router.post(`/products`, productsController.createProduct);
router.put(`/products/:productId`, productsController.updateProduct);
router.delete(`/products/:productId`, productsController.deleteProduct);

const productsRouter = {
  router,
};

export default productsRouter;
