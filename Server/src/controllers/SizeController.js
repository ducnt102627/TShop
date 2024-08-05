import { sizeValidate } from "../validation/productValidate"
import STATUS from "../utils/status";
import SizeModel from "../models/products/SizeModel"
export const addSize = async (req, res) => {
    try {
        const { name, minHeight, maxHeight, minWeight, maxWeight } = req.body;
        const { error } = sizeValidate.validate(req.body);
        if (error) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: error.details[0].message,
            })
        }
        const size = await SizeModel.create({
            name, minHeight, maxHeight, minWeight, maxWeight
        });
        return res.status(STATUS.OK).json({
            message: "Thêm kích cỡ thành công", size
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message,
        })
    }
}
export const updateSize = async (req, res) => {
    try {
        const { name, minHeight, maxHeight, minWeight, maxWeight } = req.body;
        const { error } = sizeValidate.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: error.details[0].message,
            })
        }
        const sizeUpdated = await SizeModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return res.status(STATUS.OK).json({
            message: "Cập nhật thành công", sizeUpdated
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message,
        })
    }
}
export const getAllSize = async (req, res) => {
    try {
        const data = await SizeModel.find();
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Không có kích c�� nào",
            })
        }
        return res.status(STATUS.OK).json(data)
    } catch (error) {

    }
}
export const getListPaginate = async (req, res) => {
    try {
        const { sort = "createAt", _order = "asc" } = req.query;
        const { page = 1, pageSize, tab = 1 } = req.body;
        const limit = pageSize || 10;
        const option = {
            page: page,
            limit,
            sort: { [sort]: _order === "desc" ? 1 : -1 }
        }
        const query = { deleted: tab === 2 }
        const data = await SizeModel.paginate(query, option);
        if (!data.docs || data.docs.length === 0) {
            const message = tab === 1 ? "Không có kich cỡ nào" : "Không có kích cỡ đã xóa";
            return res.status(STATUS.BAD_REQUEST).json({ message });
        }
        const result = {
            sizes: data.docs,
            limit,
            currentPage: data.page,
            totalPages: data.totalPages,
            totalItems: data.totalDocs,
        }
        return res.status(STATUS.OK).json(result)
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message,
        })
    }
}
export const getSizeById = async (req, res) => {
    try {
        const size = await SizeModel.findById({ _id: req.params.id });
        if (!size) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Không tìm thấy kích cỡ",
            })
        }
        return res.status(STATUS.OK).json({
            message: "Lấy kích cỡ thành công", size
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message,
        })
    }
}
export const deleteSortSize = async (req, res) => {
    try {
        const deletedSize = await SizeModel.findByIdAndUpdate({ _id: req.params.id }, { deleted: true }, { new: true })
        if (!deletedSize) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Xóa không thành công",
            })
        }
        return res.status(STATUS.OK).json({
            message: "Xóa thành công", deletedSize
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message,
        })
    }
}
export const deleteSizeForever = async (req, res) => {
    try {
        const data = await SizeModel.findByIdAndDelete({ _id: req.params.id });
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Xóa không thành công"
            })
        }
        return res.status(STATUS.OK).json({
            message: "Xóa thành công", data
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message,
        })
    }
}
export const restoreSizeById = async (req, res) => {
    try {
        const data = await SizeModel.findByIdAndUpdate({ _id: req.params.id }, { deleted: false }, { new: true })
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Khôi phục không thành công"
            })
        }
        return res.status(STATUS.OK).json({
            message: "Khôi phục thành công", data
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message,
        })
    }
}
