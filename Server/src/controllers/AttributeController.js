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
        return res.status(STATUS.OK).json({
            message: "Thêm thành công", data
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
