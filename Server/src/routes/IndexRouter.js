import { Router } from "express";
import categoryRouter from "./product/CategoryRouter";
import colorRouter from "./product/ColorRouter";
import sizeRouter from "./product/SizeRouter";
import productRouter from "./product/productRouter";

import authRouter from "./authRouter";


const router = Router();

router.use("/category", categoryRouter);
router.use("/color", colorRouter);
router.use("/size", sizeRouter);
router.use("/product", productRouter);
router.use("/auth", authRouter);



export default router;