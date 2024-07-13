import { Router } from "express";
import { addColor, deleteColorForever, deleteSortColor, getAllColor, getColorById, updateColor } from "../../controllers/ColorController";
import { getAllDeleted } from "../../controllers/CategoryController";

const colorRouter = Router();

colorRouter.post('/add', addColor);
colorRouter.get('/get', getAllColor);
colorRouter.get('/get/:id', getColorById);
colorRouter.get('/getDel', getAllDeleted)
colorRouter.put('/edit/:id', updateColor);
colorRouter.delete('/del/:id', deleteColorForever)
colorRouter.delete('/delSort/:id', deleteSortColor)


export default colorRouter;