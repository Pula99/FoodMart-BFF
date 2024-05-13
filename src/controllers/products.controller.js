import { HttpStatusCode } from "axios";
import productService from "../services/products.service.js"
import log4js from "log4js";

const logger = log4js.getLogger();

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(HttpStatusCode.Ok).send(products?.data)
  } catch (error) {
    logger.error("Error occurred in getting all products", error?.message);
    res.status(HttpStatusCode.InternalServerError).send(error?.message);
  }
};

const getProductById = async (req, res) => {
  try{
    const productId = req.params.productId; 
    const product = await productService.getProductById(productId);
    res.status(HttpStatusCode.Ok).send(product?.data)
  } catch(error) {
    logger.error(`Error occurred in getting a product with id ${productId}`, error?.message);
    res.status(HttpStatusCode.InternalServerError).send(error?.message);

  }
}

const createProduct = async (req, res) => {
  try { 
    const productData = req.body;
    const products = await productService.createProduct(productData);
    res.status(HttpStatusCode.Ok).send(products?.data)
  } catch (error) {
    logger.error("Error occurred in creating a product", error?.message);
    res.status(HttpStatusCode.InternalServerError).send(error?.message);
  }
}

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productData = req.body;
    const product = await productService.updateProduct(productId, productData)
    res.status(HttpStatusCode.Ok).send(product?.data);
  } catch (error) {
    logger.error(`Error occurred in updating a product with id ${productId}`, error?.message);
    res.status(HttpStatusCode.InternalServerError).send(error?.message);
  }
}

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    await productService.deleteProduct(productId)
    res.status(HttpStatusCode.NoContent).send();
  } catch (error) {
    logger.error(`Error occurred in deleting a product with id ${productId}`, error?.message);
    res.status(HttpStatusCode.InternalServerError).send(error?.message); 
  }
}



const productsController = {
    getAllProducts,
    createProduct,   
    getProductById,
    updateProduct,
    deleteProduct
}

export default productsController