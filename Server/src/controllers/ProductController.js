import ProductModel from "../models/products/ProductModel";
import { productValidate } from "../validation/productValidate";
import STATUS from "../utils/status";

export const addProduct = async (req, res) => {
    try {
        const { name, category, price, image, thumbnail, description,
            discount, quantity, featured, tags, attribute } = req.body;
        const { error } = productValidate.validate(req.body);
        if (error) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: error.details[0].message,
            })
        }
        const product = await ProductModel.create(req.body);
        if (!product || product.length === 0) {
            return res.json({
                message: "Thêm thất bại"
            })
        }
        return res.status(STATUS.OK).json({
            message: "THêm thành công", product
        })
    }
    catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}