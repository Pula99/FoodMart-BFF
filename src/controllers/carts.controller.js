import { HttpStatusCode } from "axios";
import cartService from "../services/carts.service.js";
import log4js from "log4js";
import productService from "../services/products.service.js";

const logger = log4js.getLogger();

const getAllCarts = async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    res.status(HttpStatusCode.Ok).send(carts?.data);
  } catch (error) {
    logger.error("Error occurred in getting all carts", error?.message);
    res.status(HttpStatusCode.InternalServerError).send(error?.message);
  }
};

const getCartById = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const product = await productService.getAllProducts();
    let cart = await cartService.getCartById(cartId);
    const mappedCartItems = mapProductIdsWithProductDetails(
      product.data.content,
      cart.data.cartItems
    );
    cart.data.cartItems = mappedCartItems;
    res.status(HttpStatusCode.Ok).send(cart.data);
  } catch (error) {
    logger.error(
      `Error occurred in getting a cart with id ${cartId}`,
      error?.message
    );
    res.status(HttpStatusCode.InternalServerError).send(error?.message);
  }
};

//add to util
const mapProductIdsWithProductDetails = (products, cartItems) => {
  return cartItems.map((cartItem) => {
    const product = products.find(
      (product) => product.id == cartItem.productId
    );
    return { product, quantity: cartItem.quantity };
  });
};

const createCart = async (req, res) => {
  try {
    const cartData = req.body;
    const cart = await cartService.createCart(cartData);
    res.status(HttpStatusCode.Created).send(cart?.data);
  } catch (error) {
    logger.error("Error occurred in creating a cart", error?.message);
    res.status(HttpStatusCode.InternalServerError).send(error?.message);
  }
};

const addProductsToCart = async (req, res) => {
  try {
    const productData = req.body;
    const cartId = req.params.cartId;
    //check if product is available, if not return error product not found, else add product to cart
    const cart = await cartService.addProductsToCart(cartId, productData);
    res.status(HttpStatusCode.Ok).send(cart?.data);
  } catch (error) {
    logger.error("Error occurred in adding a product", error?.message);
    res.status(HttpStatusCode.InternalServerError).send(error?.message);
  }
};

const updateCartItems = async (req, res) => {
  try {
    const productData = req.body;
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const cart = await cartService.updateCartItems(
      cartId,
      productId,
      productData
    );
    res.status(HttpStatusCode.Ok).send(cart?.data);
  } catch (error) {
    logger.error("Error occurred in updating a item", error?.message);
    res.status(HttpStatusCode.InternalServerError).send(error?.message);
  }
};

const deleteCartItems = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    await cartService.deleteCartItems(cartId, productId);
    res.status(HttpStatusCode.NoContent).send();
  } catch (error) {
    logger.error(
      `Error occurred in deleting a item with id ${productId}`,
      error?.message
    );
    res.status(HttpStatusCode.InternalServerError).send(error?.message);
  }
};

const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    await cartService.deleteCart(cartId);
    res.status(HttpStatusCode.NoContent).send();
  } catch (error) {
    logger.error(
      `Error occurred in deleting a cart with id ${cartId}`,
      error?.message
    );
    res.status(HttpStatusCode.InternalServerError).send(error?.message);
  }
};

const cartController = {
  getAllCarts,
  getCartById,
  createCart,
  addProductsToCart,
  updateCartItems,
  deleteCartItems,
  deleteCart,
};

export default cartController;
