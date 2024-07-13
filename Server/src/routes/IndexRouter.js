import { Router } from "express";
import categoryRouter from "./product/CategoryRouter";
import colorRouter from "./product/ColorRouter";
import sizeRouter from "./product/SizeRouter";

const router = Router();

router.use("/category", categoryRouter);
router.use("/color", colorRouter);
router.use("/size", sizeRouter)


export default router;