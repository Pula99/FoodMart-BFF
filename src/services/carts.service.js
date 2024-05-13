import apiInstances from "../config/apiInstance.js";
import httpConstants from "../constants/httpConstants.js"
import log4js from "log4js";

const logger = log4js.getLogger();

const getAllCarts = async () => {
    try {
        
        const response = await apiInstances.cartMicroService.request({
            url: `/carts`,
            method: httpConstants.httpMethods.get,
        })
        return response;
    } catch (error) {
        logger.error("error occured in fetching all carts ", error.message);
        throw error
    }
}

const getCartById = async (cartId) => {
    try {
        const response = await apiInstances.cartMicroService.request({
            url: `/carts/${cartId}`,
            method: "get"
        })
        return response
    } catch (error) {
        logger.error("error occured in fetching a cart", error.message);
        throw error
    }
}

const createCart = async (cartData) => {
    try {
        const response = await apiInstances.cartMicroService.request({
            url: `/carts`,
            method: "post",
            data: cartData,
        });
        return response;
    } catch (error) {
        logger.error("error occured when creating a cart" ,error.message);
        throw error
    }
}

const addProductsToCart = async (cartId, productData) => {
    try {
        const response = await apiInstances.cartMicroService.request({
            url: `/carts/${cartId}`,
            method: "post",
            data: productData
        })
        return response
    } catch (error) {
        logger.error("error occured when adding new items", error.message);
        throw error
    }
}

const updateCartItems =async (cartId,productId, productData) => {
    try {
        const response = await apiInstances.cartMicroService.request({
            url: `/carts/${cartId}/${productId}`,
            method: "put",
            data: productData
        })
        return response;
    } catch (error) {
        logger.error("error occured when updating items",error.message);
        throw error
    }
}

const deleteCartItems = async (cartId, productId) => {
    try {
        const response = await apiInstances.cartMicroService.request({
            url: `/carts/${cartId}/${productId}`,
            method: "delete"
        })
        return response
    } catch (error) {
        logger.error("errpr occured when deleting a product", error.message)
        throw error
    }
}

const deleteCart = async (cartId) => {
    try {
        const response = await apiInstances.cartMicroService.request({
            url: `/carts/${cartId}`,
            method: "delete"
        })
        return response
    } catch (error) {
        logger.error("error occured when deleting in a cart" , error.message)
        throw error
    }
}

const cartService = {
    getAllCarts,
    getCartById,
    createCart,
    addProductsToCart,
    updateCartItems,
    deleteCartItems,
    deleteCart
}

export default cartService;