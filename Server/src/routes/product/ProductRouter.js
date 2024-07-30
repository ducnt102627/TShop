import { Router } from "express";
import { addProduct } from "../../controllers/ProductController";

const productRouter = Router();

productRouter.post('/add', addProduct)

export default productRouter