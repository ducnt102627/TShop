import ColorModel from "../models/products/ColorModel";
import STATUS from "../utils/status";
import { colorValidate } from "../validation/productValidate";

export const addColor = async (req, res) => {
    try {
        const { name, code } = req.body;
        const { error } = colorValidate.validate(req.body);
        if (error) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: error.details[0].message,
            })
        }
        const color = await ColorModel.create({ name, color });
        return res.status(STATUS.OK).json({
            message: "Thêm thành công", color
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
export const updateColor = async () => {
    try {
        const { error } = colorValidate.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: error.details[0].message,
            })
        }
        const updatedColor = await ColorModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!updateColor) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Cập nhật thất bại",
            })
        }
        return res.status(STATUS.OK).json({
            message: "Cập nhật thành công", updatedColor
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
export const getAllColor = async (req, res) => {
    try {
        const { _page = 1, _limit = 10, sort = "createAt", _order = "asc" } = req.query;
        const option = {
            page: _page,
            limit: _limit,
            sort: { [sort]: _order === "desc" ? 1 : -1 }
        }
        const data = await ColorModel.paginate({}, option);
        if (!data.docs) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Không có màu nào"
            })
        }
        console.log(data)
        const response = {
            colors: data.docs,
            pagination: {
                currentPage: data.page,
                totalPages: data.totalPages,
                totalItems: data.totalDocs
            }
        }
        return res.status(STATUS.OK).json({
            message: "Danh sách màu", response
        })

    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
export const getColorById = async (req, res) => {
    try {
        const color = await ColorModel.findById({ _id: req.params.id });
        if (!color) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Không tìm thấy màu",
            })
        }
        return res.status(STATUS.OK).json({
            message: "Lấy màu thành công", color
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
export const getDeletedAll = async (req, res) => {
    try {
        const colors = await ColorModel.findDeleted({});
        if (!colors) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Không có màu nào",
            })
        }
        const colorsDeleted = colors.docs.filter(color => color.deleted === true);
        if (colorsDeleted.length === 0) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Không có màu nào đã xóa",
            })
        }
        return res.status(STATUS.OK).json({
            message: "Danh sách đã xóa", colorsDeleted
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
export const deleteSortColor = async (req, res) => {
    try {
        const colorDeleted = await ColorModel.delete({ _id: req.params.id });
        if (!colorDeleted) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Xóa không thành công",
            })
        }
        return res.status(STATUS.OK).json({
            message: "Xóa thành công", colorDeleted
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
export const deleteColorForever = async (req, res) => {
    try {
        const data = await ColorModel.findByIdAndDelete({ _id: req.params.id });
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Xóa không thành công",
            })
        }
        return res.status(STATUS.OK).json({
            message: "Xóa thành công", data
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
export const restoreColorById = async (req, res) => {
    try {
        const data = await ColorModel.restore({ _id: req.params.id });
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Khôi phục không thành công",
            })
        }
        return res.status(STATUS.OK).json({
            message: "Khôi phục thành công", data
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}