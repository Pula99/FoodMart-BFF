import axios from "axios";
import config from "./endpoints.json" assert { type: 'json' };

const productMicroService = axios.create({
    baseURL: `${config.productService}/api/v1`
})

const cartMicroService = axios.create({
    baseURL: `${config.cartService}/api/v1`
})

const userMircoService = axios.create({
    baseURL: `${config.userService}/api/v1`
})

const apiInstances = {
    productMicroService,
    cartMicroService,
    userMircoService
}

export default apiInstances;