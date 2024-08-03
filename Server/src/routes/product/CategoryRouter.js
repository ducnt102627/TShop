import { Router } from "express";
import { addCategory, deleteSortCategory, getAll, getById, restoreCategoryById, updateCategory } from "../../controllers/CategoryController";

const categoryRouter = Router();

categoryRouter.post('/add', addCategory);
categoryRouter.put('/update/:id', updateCategory);
categoryRouter.post('/getListPag', getAll);
categoryRouter.get('/get/:id', getById);
categoryRouter.delete('/delSort/:id', deleteSortCategory);
categoryRouter.put('/restore/:id', restoreCategoryById)
export default categoryRouter;