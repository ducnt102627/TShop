import { Router } from "express";
import { addCategory, deleteSortCategory, getAll, getAllDeleted, getById, restoreCategoryById, updateCategory } from "../../controllers/CategoryController";

const categoryRouter = Router();

categoryRouter.post('/add', addCategory);
categoryRouter.put('/update/:id', updateCategory);
categoryRouter.get('/get', getAll);
categoryRouter.get('/getDeleted', getAllDeleted);
categoryRouter.get('/get/:id', getById);
categoryRouter.delete('/delSort/:id', deleteSortCategory);
categoryRouter.patch('/restore/:id', restoreCategoryById)
export default categoryRouter;