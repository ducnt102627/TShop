import { Router } from "express";
import { addSize, deleteSizeForever, deleteSortSize, getAllSize, getDeletedAll, getSizeById, restoreSizeById, updateSize } from "../../controllers/SizeController";

const sizeRouter = Router();

sizeRouter.get('/get', getAllSize);
sizeRouter.get('/get/:id', getSizeById);
sizeRouter.get('/getDeleted', getDeletedAll)
sizeRouter.post('/add', addSize);
sizeRouter.put('/edit/:id', updateSize);
sizeRouter.delete('/delSort/:id', deleteSortSize);
sizeRouter.delete('/delForever/:id', deleteSizeForever);
sizeRouter.patch('/restore/:id', restoreSizeById)

export default sizeRouter;