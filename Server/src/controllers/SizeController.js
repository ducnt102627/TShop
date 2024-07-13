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
        const size = await SizeModel.create(req.body);
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
        const { _page = 1, _limit = 10, sort = "createAt", _order = "asc" } = req.query;
        const option = {
            page: _page,
            limit: _limit,
            sort: { [sort]: _order === "desc" ? 1 : -1 }
        }
        const data = await SizeModel.paginate({}, option);
        const response = {
            sizes: data.docs,
            pagination: {
                currentPage: data.page,
                totalPages: data.totalPages,
                totalItems: data.totalDocs,
            }
        }
        return res.status(STATUS.OK).json({
            message: "Danh sách kích cỡ", response
        })
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
        const deletedSize = await SizeModel.delete({ _id: req.params.id });
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
        const data = await SizeModel.restore({ _id: req.params.id });
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
export const getDeletedAll = async (req, res) => {
    try {
        const data = await SizeModel.findDeleted({});
        console.log(data)
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Không có kích cỡ nào đã xóa",
            })
        }
        const sizeDeleted = data.filter(size => size.deleted === true);
        if (sizeDeleted.length === 0) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Không có kích cỡ nào đã xóa",
            })
        }
        return res.status(STATUS.OK).json({
            message: "Danh sách đã xóa", sizeDeleted
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message,
        })
    }
}