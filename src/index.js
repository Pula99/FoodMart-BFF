// Import required modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors"

import productsRouter from './routes/products.route.js';
import cartsRouter from './routes/carts.route.js';
import usersRouter from './routes/users.route.js';



const { json, urlencoded } = bodyParser

// Create an instance of Express
const app = express();

// Middleware setup
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors())


app.use("/api/v1", productsRouter.router)
app.use("/api/v1", cartsRouter.router)
app.use("/api/v1",usersRouter.router)


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
