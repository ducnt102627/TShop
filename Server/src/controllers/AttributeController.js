import AttributeModel from "../models/products/AttributeModel"
import STATUS from "../utils/status";

export const addAttribute = async (req, res) => {
    try {
        const data = await AttributeModel.create(req.body);
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json(
                { message: "Thêm thất bại", }
            )
        }
        return res.status(STATUS.OK).json({
            message: "Thêm thành công"
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}