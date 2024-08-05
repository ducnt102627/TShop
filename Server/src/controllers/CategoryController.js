import { categoryValidate } from "../validation/productValidate";
import STATUS from "../utils/status";
import CategoryModel from "../models/products/CategoryModel";
import slugify from "slugify";


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
export const getListPag = async (req, res) => {
    try {
        const { sort = "createAt", _order = "asc" } = req.query;
        const { page = 1, pageSize, tab = 1 } = req.body;
        let limit = pageSize || 10
        const options = {
            page: req.query.page || page,
            limit,
            sort: { [sort]: _order === "desc" ? 1 : -1 }
        }

        const query = { deleted: tab === 2 };
        const data = await CategoryModel.paginate(query, options);

        if (!data.docs || data.docs.length === 0) {
            const message = tab === 1 ? "Không có danh mục nào" : "Không có danh mục đã xóa";
            return res.status(STATUS.BAD_REQUEST).json({ message });
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
export const getAll = async (req, res) => {
    try {
        const data = await CategoryModel.find({ deleted: false });
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Không có danh mục nào"
            })
        }
        return res.status(STATUS.OK).json(data)
    } catch (error) {

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
export const deleteSortCategory = async (req, res) => {
    try {
        const data = await CategoryModel.findByIdAndUpdate({ _id: req.params.id }, { deleted: true }, { new: true });
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
        const data = await CategoryModel.findByIdAndUpdate({ _id: req.params.id }, { deleted: false }, { new: true });
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