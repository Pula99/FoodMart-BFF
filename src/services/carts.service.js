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

const getCartByUserId = async (userId) => {
    try {
        const response = await apiInstances.cartMicroService.request({
            url: `/carts/user/${userId}`,
            method: httpConstants.httpMethods.get,
        })
        return response;
    } catch (error) {
        logger.error("error occured in fetching carts by user id ", error.message);
        throw error
    }
}

const getCartById = async (cartId) => {
    try {
        const response = await apiInstances.cartMicroService.request({
            url: `/carts/${cartId}`,
            method: httpConstants.httpMethods.get,
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
            method: httpConstants.httpMethods.post,
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
            method: httpConstants.httpMethods.post,
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
            method: httpConstants.httpMethods.put,
            data: productData
        })
        return response;
    } catch (error) {
        logger.error("error occured when updating items",error.message);
        throw error
    }
}

const updateCart = async (cartId,cartData) => {
    try {
        const response = await apiInstances.cartMicroService.request({
            url: `/carts/${cartId}`,
            method: httpConstants.httpMethods.put,
            data: cartData
        })
        return response;
    } catch (error) {
        logger.error("error occured when updating items",error.message);
    }
}

const deleteCartItems = async (cartId, productId) => {
    try {
        const response = await apiInstances.cartMicroService.request({
            url: `/carts/${cartId}/${productId}`,
            method: httpConstants.httpMethods.delete,
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
            method: httpConstants.httpMethods.delete,
        })
        return response
    } catch (error) {
        logger.error("error occured when deleting in a cart" , error.message)
        throw error
    }
}

const cartService = {
    getAllCarts,
    getCartByUserId,
    getCartById,
    createCart,
    addProductsToCart,
    updateCartItems,
    deleteCartItems,
    deleteCart,
    updateCart
}

export default cartService;