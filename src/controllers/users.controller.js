import { HttpStatusCode } from "axios";
import userServices from "../services/users.service.js";
import log4js from "log4js";

const logger = log4js.getLogger();

const getAllUsers = async (req, res) => {
    try {
        const users = await userServices.getAllUsers();
        res.status(HttpStatusCode.Ok).send(users?.data);
    } catch (error) {
        logger.error("Error occurred when getting all users", error?.message);
        res.status(HttpStatusCode.InternalServerError).send(error?.message);
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const users = await userServices.getUserById(id);
        res.status(HttpStatusCode.Ok).send(users?.data);
    } catch (error) {
        logger.error("Error occurred when getting user with id", error?.message);
        res.status(HttpStatusCode.InternalServerError).send(error?.message);
    }
}
const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const users = await userServices.createUser(userData);
        res.status(HttpStatusCode.Created).send(users?.data);
    } catch (error) {
        logger.error("Errpr occurred when creating new user", error?.message);
        res.status(HttpStatusCode.InternalServerError).send(error?.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const userData = req.body;
        const id = req.params.id;
        const users = await userServices.updateUser(userData,id)
        res.status(HttpStatusCode.Ok).send(users?.data);
    } catch (error) {
        logger.error("Error occurred when updating user", error?.message);
        res.status(HttpStatusCode.InternalServerError).send(error?.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const users = await userServices.deleteUser(id);
        res.status(HttpStatusCode.NoContent).send(users?.data)
    } catch (error) {
        logger.error("Error occurred when deleting user", error?.message);
        res.status(HttpStatusCode.InternalServerError).send(error?.message);
    }
}

const userControllers = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}

export default userControllers