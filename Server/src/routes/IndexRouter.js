import { Router } from "express";
import categoryRouter from "./product/CategoryRouter";
import colorRouter from "./product/ColorRouter";
import sizeRouter from "./product/SizeRouter";
import authRouter from "./authRouter";
import productRouter from "./product/ProductRouter";
import attributeRouter from "./product/AttributeRouter";


const router = Router();

router.use("/category", categoryRouter);
router.use("/color", colorRouter);
router.use("/size", sizeRouter);
router.use("/product", productRouter);
router.use("/auth", authRouter);
router.use("/attribute", attributeRouter);



export default router;