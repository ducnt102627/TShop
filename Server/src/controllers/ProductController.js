import ProductModel from "../models/products/ProductModel";
import { productValidate } from "../validation/productValidate";
import STATUS from "../utils/status";
import AttributeModel from "../models/products/AttributeModel";

export const addProduct = async (req, res) => {
    try {
        const { name, category, price, image, thumbnail, description,
            discount, quantity, featured, tags, attribute = [] } = req.body;
        const { error } = productValidate.validate(req.body);
        console.log(">>>ERROR:", error);

        if (error) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: error.details[0].message,
            })
        }
        console.log(">>>Running addProduct");

        const dataAttributes = await AttributeModel.create(
            attribute
        );
        console.log(">>> Data attributes: ", dataAttributes);
        req.body.attribute = dataAttributes?.map(attribute => attribute?._id);
        console.log(">>> Payload", req.body);

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
export const getPaginate = async (req, res) => {
    try {
        const { sort = "createAt", _order = "asc" } = req.query;
        const { page = 1, pageSize = 10, tab = 1 } = req.body;
        const limit = pageSize;

        const options = {
            page,
            limit,
            sort: { [sort]: _order === "desc" ? -1 : 1 }
        };

        const query = { deleted: tab === 2 };
        const data = await ProductModel.paginate(query, options);
        if (!data.docs || data.docs.length === 0) {
            const message = tab === 1 ? "Không có sản phẩm nào" : "Không có sản phẩm đã xóa";
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
export const getAllProducts = async (req, res) => {
    try {
        const data = await ProductModel.find({ deleted: false });
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Không có sản phẩm nào"
            })
        }
        return res.status(STATUS.OK).json(data)
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
export const getProductById = async (req, res) => {
    try {
        const data = await ProductModel.findById({ _id: req.params.id });
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Không có sản phẩm nào"
            })
        }
        return res.status(STATUS.OK).json(data)
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
export const hiddenProductById = async (req, res) => {
    try {
        const data = await ProductModel.findByIdAndUpdate({ _id: req.params.id }, { deleted: true }, { new: true });
        if (!data) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Xóa thất bại"
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