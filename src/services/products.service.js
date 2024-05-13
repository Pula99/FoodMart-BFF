import apiInstance from "../config/apiInstance.js";
import log4js from "log4js";

const logger = log4js.getLogger();

const getAllProducts = async () => {
  try {
    const response = await apiInstance.productMicroService.request({
      url: `/products`,
      method: "get",
    });
    return response;
  } catch (error) {
    logger.error("Error occuerd in fetching all products", error.message);
    throw error
  }
};

const getProductById = async (productId) => {
  try {
    const response = await apiInstance.productMicroService.request({
      url: `/products/${productId}`,
      method: "get",
    });
    return response;
  } catch (error) {
    logger.error("Error occuerd in fetching a product", error.message);
    throw error
  }
};

const createProduct = async (productData) => {
  try {
    const response = await apiInstance.productMicroService.request({
      url: `/products`,
      method: "post",
      data: productData,
    });
    return response;
  } catch (error) {
    logger.error("Error occured when creatig a product", error.message);
    throw error
  }
};

const updateProduct = async (productId, productData) => {
  try {
    const response = await apiInstance.productMicroService.request({
      url: `/products/${productId}`,
      method: "put",
      data: productData,
    });
    return response;
  } catch (error) {
    logger.error("Error occured when updating a product");
    throw error
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await apiInstance.productMicroService.request({
      url: `/products/${productId}`,
      method: "delete",
    })
    return response
  } catch (error) {
    logger.error(`Error occurred when deleting a product with id ${productId}`,error.message)
    throw error
  }
}

const productServices = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
};

export default productServices;
