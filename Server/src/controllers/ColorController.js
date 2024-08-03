import ColorModel from "../models/products/ColorModel";
import SizeModel from "../models/products/SizeModel";
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
        const color = await ColorModel.create({ name, code });
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
        const data = await ColorModel.find();
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Không có màu nào",
            })
        }
        return res.status(STATUS.OK).json(data)
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
export const getListPaginate = async (req, res) => {
    try {
        const { sort = "createAt", _order = "asc" } = req.query;
        const { page = 1, pageSize } = req.body;
        let limit = pageSize || 10;

        const option = {
            page: page,
            limit,
            sort: { [sort]: _order === "desc" ? 1 : -1 }
        }
        const query = { deleted: tab === 2 }
        const data = await ColorModel.paginate(query, option);
        if (!data.docs || data.docs.length === 0) {
            const message = tab === 1 ? "Không có màu nào" : "Không có màu đã xóa"
            return res.status(STATUS.BAD_REQUEST).json({ message })
        }
        const result = {
            content: data.docs,
            limit,
            currentPage: data.page,
            totalPages: data.totalPages,
            totalItems: data.totalDocs
        }
        return res.status(STATUS.OK).json(result)

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

export const deleteSortColor = async (req, res) => {
    try {
        const colorDeleted = await ColorModel.findByIdAndUpdate({ _id: req.params.id }, { deleted: true }, { new: true })
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
        const data = await ColorModel.findByIdAndUpdate({ _id: req.params.id }, { deleted: false }, { new: true })
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Khôi phục thất bại",
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