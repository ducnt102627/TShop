import { categoryValidate } from "../validation/productValidate";
import STATUS from "../utils/status";
import CategoryModel from "../models/products/CategoryModel";
import slugify from "slugify";
import { paginate } from "mongoose-paginate-v2";

export const addCategory = async (req, res) => {
    try {
        const { error } = categoryValidate.validate(req.body);
        if (error) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: error.details[0].message,
            })
        }
        const newCategory = await CategoryModel.create({
            name: req.body.name,
            slug: slugify(req.body.name, "-")
        });
        return res.status(STATUS.OK).json({
            message: "Tạo danh mục thành công", newCategory
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message,
        })
    }
}
export const updateCategory = async (req, res) => {
    try {
        const { error } = categoryValidate.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: error.details[0].message,
            })
        }
        const categoryUpdate = await CategoryModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return res.status(STATUS.OK).json({
            message: "Cập nhật danh mục thành công", categoryUpdate
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
export const getAll = async (req, res) => {
    try {
        const { _page = 1, _limit = 10, sort = "createAt", _order = "asc" } = req.query;
        const option = {
            page: _page,
            limit: _limit,
            sort: { [sort]: _order === "desc" ? 1 : -1 }
        }
        const data = await CategoryModel.paginate({}, option)
        console.log(data)
        if (!data.docs) {
            return res.status(STATUS.BAD_REQUEST).json({ message: "Không có danh mục nào" })
        }
        const response = {
            categories: data.docs,
            pagination: {
                currentPage: data.page,
                totalPages: data.totalPages,
                totalItems: data.totalDocs
            }
        }
        // console.log("response: ", response)
        return res.status(STATUS.OK).json({
            message: "Lấy danh mục thành công", response
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
export const getById = async (req, res) => {
    try {
        const data = await CategoryModel.findById(req.params.id);
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Sản phẩm không tồn tại"
            })
        }
        return res.status(STATUS.OK).json({
            message: "Lấy danh mục thành công", data
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
export const getAllDeleted = async (req, res) => {
    try {
        const data = await CategoryModel.findDeleted({});
        // console.log("data deleted", data)
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Khong co danh muc nao"
            })
        }
        const deletedData = data.filter(category => category.deleted === true);
        if (deletedData.length === 0) {
            return res.json({
                message: "Khong co danh muc da xoa"
            })
        }
        return res.status(STATUS.OK).json({
            message: "Danh muc da xoa", data
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
export const deleteSortCategory = async (req, res) => {
    try {
        const data = await CategoryModel.delete({ _id: req.params.id });
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
export const deleteForeverCategory = async (req, res) => {
    try {
        const data = await CategoryModel.findOneAndDelete({ _id: req.body.params });
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Xóa không thành công"
            })
        }
        return res.status(STATUS.OK).json({
            message: "Danh mục đã được xóa vĩnh viễn", data
        })
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
export const restoreCategoryById = async (req, res) => {
    try {
        const data = await CategoryModel.restore({ _id: req.params.id });
        if (!data) {
            return res.status(STATUS.body).json({
                message: "Khôi phục thất bại"
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