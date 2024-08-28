import apiInstances from "../config/apiInstance.js";
import httpConstants from "../constants/httpConstants.js";
import log4js from "log4js";

const logger = log4js.getLogger();

const getAllUsers = async () => {
    try {
        const response = await apiInstances.userMircoService.request({
            url: `/users`,
            method: httpConstants.httpMethods.get,
        });
        return response;
    } catch (error) {
        logger.error("Error occurred when getting  all users",error.message);
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        const response = await apiInstances.userMircoService.request({
            url: `/users/${id}`,
            method: httpConstants.httpMethods.get,
        });
        return response
    } catch (error) {
        logger.error("Error occurred when getting user", error.message)
        throw error;
    }
}

const createUser = async (userData) => {
    try {
        const response = await apiInstances.userMircoService.request({
            url: `/users`,
            method: httpConstants.httpMethods.post,
            data: userData,
        })
        return response;
    } catch (error) {
        logger.error("Error occurred when creating new user", error.message)
        throw error;
    }
}

const updateUser = async (userData,id) => {
    try {
        const response = await apiInstances.userMircoService.request({
            url: `/users/${id}`,
            data: userData,
            method: httpConstants.httpMethods.put,
        });
        return response;
    } catch (error) {
        logger.error("Error occurred when updating user",error.message)
        throw error;
    }
}

const deleteUser = async (id) => {
    try {
        const response = await apiInstances.userMircoService.request({
            url: `/users/${id}`,
            method: httpConstants.httpMethods.delete,
        });
        return response;
    } catch (error) {
        logger.error("Error occurred when deleting user",error.message);
        throw error;
    }
}

const userServices = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};

export default userServices;