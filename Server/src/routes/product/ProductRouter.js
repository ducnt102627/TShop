import { Router } from "express";
import { addProduct, getAllProducts, getPaginate, getProductById, hiddenProductById } from "../../controllers/ProductController";

const productRouter = Router();

productRouter.post('/add', addProduct)
productRouter.post('/paginate', getPaginate);
productRouter.get('/getAll', getAllProducts);
productRouter.get('/get/:id', getProductById);
productRouter.delete('/delSort/:id', hiddenProductById);

export default productRouter