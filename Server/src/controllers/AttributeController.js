import AttributeModel from "../models/products/AttributeModel"
import STATUS from "../utils/status";

export const addAttribute = async (req, res) => {
    try {
        const { color, size, price, quantity } = req.body;
        const data = await AttributeModel.create({
            color,
            size,
            price,
            quantity,
        });
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json(
                { message: "Thêm thất bại", }
            )
        }
        console.log(data)
        return res.status(STATUS.OK).json({
            message: "Thêm thành công", data
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
export const getAllAttributes = async (req, res) => {
    try {
        const data = await AttributeModel.find({ deleted: false });
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Không có thuộc tính nào",
            })
        }
        return res.status(STATUS.OK).json(data)
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}