import apiInstance from "../config/apiInstance.js";
import httpConstants from "../constants/httpConstants.js";
import log4js from "log4js";

const logger = log4js.getLogger();

const getAllProducts = async (page, size) => {
  try {
    const response = await apiInstance.productMicroService.request({
      url: `/products`,
      params: {
        page,
        size,
      },
      method: httpConstants.httpMethods.get,
    });
    return response;
  } catch (error) {
    logger.error("Error occuerd when fetching all products", error.message);
    throw error;
  }
};

const getAllProductsByCategory = async (category) => {
  try {
    const response = await apiInstance.productMicroService.request({
      url: `/products/categories/${category}`,
      method: httpConstants.httpMethods.get,
    });
    return response;
  } catch (error) {
    logger.error(
      "Error occurred when getting all products by category",
      error.message
    );
  }
};

const getProductById = async (productId) => {
  try {
    const response = await apiInstance.productMicroService.request({
      url: `/products/${productId}`,
      method: httpConstants.httpMethods.get,
    });
    return response;
  } catch (error) {
    logger.error("Error occuerd in fetching a product", error.message);
    throw error;
  }
};

const createProduct = async (productData) => {
  try {
    const response = await apiInstance.productMicroService.request({
      url: `/products`,
      method: httpConstants.httpMethods.post,
      data: productData,
    });
    return response;
  } catch (error) {
    logger.error("Error occured when creatig a product", error.message);
    throw error;
  }
};

const updateProduct = async (productId, productData) => {
  try {
    const response = await apiInstance.productMicroService.request({
      url: `/products/${productId}`,
      method: httpConstants.httpMethods.put,
      data: productData,
    });
    return response;
  } catch (error) {
    logger.error("Error occured when updating a product");
    throw error;
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await apiInstance.productMicroService.request({
      url: `/products/${productId}`,
      method: httpConstants.httpMethods.delete,
    });
    return response;
  } catch (error) {
    logger.error(
      `Error occurred when deleting a product with id ${productId}`,
      error.message
    );
    throw error;
  }
};

const productServices = {
  getAllProducts,
  getAllProductsByCategory,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};

export default productServices;
