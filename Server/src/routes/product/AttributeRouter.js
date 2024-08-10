import { Router } from "express";
import { addAttribute, getAllAttributeById, getAllAttributes } from "../../controllers/AttributeController";

const attributeRouter = Router();

attributeRouter.post('/add', addAttribute);;
attributeRouter.get('/getAll', getAllAttributes)
attributeRouter.get('/get/:id', getAllAttributeById)

export default attributeRouter;