import { Router } from "express";

import { getDeletedAll } from "../../controllers/ColorController";
import { addColor } from "../../controllers/ColorController";
import { getColorById } from "../../controllers/ColorController";
import { updateColor } from "../../controllers/ColorController";
import { getAllColor } from "../../controllers/ColorController";
import { deleteColorForever } from "../../controllers/ColorController";
import { deleteSortColor } from "../../controllers/ColorController";
import authentication from "../../middlewares/authentication";

const colorRouter = Router();

colorRouter.post('/add', addColor);
colorRouter.get('/get', authentication, getAllColor);
colorRouter.get('/get/:id', getColorById);
colorRouter.get('/getDel', getDeletedAll)
colorRouter.put('/edit/:id', updateColor);
colorRouter.delete('/del/:id', deleteColorForever)
colorRouter.delete('/delSort/:id', deleteSortColor)


export default colorRouter;