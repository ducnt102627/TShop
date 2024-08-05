import { Router } from "express";
import { addAttribute, getAllAttributes } from "../../controllers/AttributeController";

const attributeRouter = Router();

attributeRouter.post('/add', addAttribute);;
attributeRouter.get('/getAll', getAllAttributes)

export default attributeRouter;