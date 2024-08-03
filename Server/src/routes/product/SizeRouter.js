import { Router } from "express";
import { addSize, deleteSizeForever, deleteSortSize, getAllSize, getListPaginate, getSizeById, restoreSizeById, updateSize } from "../../controllers/SizeController";

const sizeRouter = Router();

sizeRouter.get('/get', getAllSize);
sizeRouter.post('/paginate', getListPaginate);
sizeRouter.get('/get/:id', getSizeById);
sizeRouter.post('/add', addSize);
sizeRouter.put('/edit/:id', updateSize);
sizeRouter.delete('/delSort/:id', deleteSortSize);
sizeRouter.delete('/delForever/:id', deleteSizeForever);
sizeRouter.put('/restore/:id', restoreSizeById)

export default sizeRouter;