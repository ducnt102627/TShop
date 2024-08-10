import { Router } from "express";
import { addProduct, getAllProducts, getPaginate, getProductById, getProductBySlug, hiddenProductById, pagingProduct } from "../../controllers/ProductController";

const productRouter = Router();

productRouter.post('/add', addProduct)
productRouter.post('/paginate', getPaginate);
productRouter.get('/getAll', getAllProducts);
productRouter.get('/paging', pagingProduct);
productRouter.get('/get/:id', getProductById);
productRouter.get('/get/slug/:slug', getProductBySlug);
productRouter.delete('/delSort/:id', hiddenProductById);

export default productRouter