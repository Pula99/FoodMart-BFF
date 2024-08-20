import express from "express";
import cartController from "../controllers/carts.controller.js";

const router = express.Router();

router.get(`/carts`, cartController.getAllCarts);
router.get(`/carts/user/:userId`, cartController.getCartByUserId);
router.get(`/carts/:cartId`, cartController.getCartById);
router.post(`/carts`, cartController.createCart);
router.post(`/carts/:cartId`, cartController.addProductsToCart);
router.put(`/carts/:cartId/:productId`, cartController.updateCartItems);
router.put(`/carts/:cartId`, cartController.updateCart);
router.delete(`/carts/:cartId/:productId`, cartController.deleteCartItems);
router.delete(`/carts/:cartId`, cartController.deleteCart);

const cartsRouter = {
    router,
}

export default cartsRouter;