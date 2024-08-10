import ProductModel from "../models/products/ProductModel";
import { productValidate } from "../validation/productValidate";
import STATUS from "../utils/status";
import AttributeModel from "../models/products/AttributeModel";
import slugify from "slugify";
import CategoryModel from "../models/products/CategoryModel";
import { set } from "mongoose";
export const addProduct = async (req, res) => {
    try {
        const { name, category, price, image, thumbnail, description,
            discount, slug, featured, tags, attribute = [] } = req.body;
        const { error } = productValidate.validate(req.body);
        if (error) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: error.details[0].message,
            })
        }
        const dataAttributes = await AttributeModel.create(
            attribute
        );
        const quantity = dataAttributes.reduce((acc, item) => {
            return acc + item.quantity
        }, 0)
        console.log("quantity", quantity)
        // req.body.attribute = dataAttributes?.map(attribute => attribute?._id);
        const product = await ProductModel.create({
            name, category, price, image, thumbnail, description,
            discount, quantity, featured, tags, attribute: dataAttributes?.map(attribute => attribute?._id),
            slug: slugify(req.body.name, "-")
        });
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
        // const { sort = "createAt", _order = "asc" } = req.query;
        // const { page = 1, pageSize = 10, tab = 1 } = req.body;
        const { sort = "createAt", _order = "desc", page = 1, pageSize = 10, tab = 1 } = req.query;
        const limit = pageSize;
        let categoryId;
        let attributeId;
        if (req.query.category) {
            const category = await CategoryModel.findOne({ slug: req.query.category });
            if (category) {
                categoryId = category._id;
            }
        }
        if (req.query.size) {
            attributeId = Array.from(
                // lọc các phần tử bị trùng lập
                new Set(await AttributeModel.findById({ size: req.query.size }, "_id"))
            );
            attributeId = attributeId.map((a) => attributeId._id.toString());
        }
        if (req.query.color) {
            attributeId = Array.from(
                new Set(await AttributeModel.find({ color: req.query.color }, "_id"))
            );
            attributeId = attributeId.map((a) => a._id.toString()); // biến đổi từng pt trong attrbute[] sang dạng chuỗi
        }
        if (req.query.size && req.query.color) {
            attributeId = Array.from(
                new Set(await AttributeModel.find({
                    size: req.query.size, color: req.query.color
                }, "_id"))
            );
            attributeId = attributeId.map((a) => a._id.toString());
        }

        const options = {
            page,
            limit,
            sort: { [sort]: _order === "desc" ? -1 : 1 },
            populate: [
                { path: "attribute", populate: ["size", "color"] },
                { path: "category" }
            ]
        };
        const query = { deleted: tab === 2 };
        if (categoryId) {
            query.category = categoryId;
        }
        // if (attributeId.length > 0) {
        //     query.attribute = { $in: attributeId }; // Dùng $in để lọc theo nhiều attributeId
        // }
        const data = await ProductModel.paginate(query, options);
        if (!data.docs || data.docs.length === 0) {
            const message = tab === 1 ? "Không có sản phẩm nào" : "Không có sản phẩm đã xóa";
            return res.status(STATUS.BAD_REQUEST).json({ message });
        }
        const result = {
            sort: { [sort]: _order === "asc" ? -1 : 1 },
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
        const product = await ProductModel.findById({ _id: req.params.id }).populate([
            {
                path: "attribute",
                populate: [
                    {
                        path: "color",
                        model: "Color",
                    },
                    {
                        path: "size",
                        model: "Size",
                    },
                ],
            },
            {
                path: "category",
                model: "Category",
                select: {
                    _id: 1,
                    name: 1,
                },
            },
        ]);
        if (!product) {
            return res.status(STATUS.BAD_REQUEST).json({
                message: "Không có sản phẩm nào"
            })
        }
        return res.status(STATUS.OK).json(product)
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        })
    }
}
export const getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await ProductModel.findOne({ slug: slug }).populate([
            {
                path: "attribute",
                populate: [
                    {
                        path: "color",
                        model: "Color",
                    },
                    {
                        path: "size",
                        model: "Size",
                    },
                ],
            },
            {
                path: "category",
                model: "Category",
                select: {
                    _id: 1,
                    name: 1,
                },
            },
        ]);

        if (!product) {
            return res.status(STATUS.NOT_FOUND).json({
                message: "Không tìm thấy sản phẩm",
            });
        }

        return res.status(STATUS.OK).json({
            message: "Lấy sản phẩm thành công",
            product
        });
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message
        });
    }
};
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
export const pagingProduct = async (req, res) => {
    try {
        const {
            pageIndex,
            pageSize,
            keyword,
            color = [],
            size = [],
            sort = 1,
            fieldSort,
            category,
            min,
            max,
            tab,
        } = req.body;

        let limit = pageSize || 10;
        let skip = (pageIndex - 1) * limit || 0;
        let queryKeyword = keyword
            ? {
                name: {
                    $regex: keyword,
                    $options: "i",
                },
            }
            : {};
        let queryAttribute = {};
        let querySort = {};
        let queryCategory = {};
        let queryPrice = {};
        let queryTab = {};

        if (tab === 2) {
            queryTab = {
                is_deleted: true,
            };
        } else {
            queryTab = {
                is_deleted: false,
            };
        }

        // attribute
        if (color.length > 0 || size.length > 0) {
            let conditions = {};

            if (color.length > 0 && size.length > 0) {
                conditions = {
                    $and: [
                        {
                            size: {
                                $in: size,
                            },
                        },
                        {
                            color: {
                                $in: color,
                            },
                        },
                    ],
                };
            } else if (color.length > 0) {
                conditions = { color: color };
            } else if (size.length > 0) {
                conditions = { size: size };
            }
            const listAttributeColor = await AttributeModel.find(conditions);
            console.log("listAttributeColor", listAttributeColor)
            const colorAttributeIds = listAttributeColor?.map((attr) => attr._id);
            queryAttribute = {
                attributes: {
                    $in: colorAttributeIds,
                },
            };
        }
        // sắp xếp
        if (fieldSort) {
            querySort = {
                [fieldSort]: sort,
            };
        } else {
            querySort = {
                createdAt: sort,
            };
        }

        if (category) {
            queryCategory = {
                category,
            };
        }

        if (min || max) {
            if (min && max) {
                queryPrice = {
                    $and: [
                        {
                            price: {
                                $lte: max,
                            },
                        },
                        {
                            price: {
                                $gte: min,
                            },
                        },
                    ],
                };
            } else if (min) {
                queryPrice = {
                    price: {
                        $gte: min,
                    },
                };
            } else if (max) {
                queryPrice = {
                    price: {
                        $lte: max,
                    },
                };
            }
        }

        const listProduct = await ProductModel.find({
            ...queryKeyword,
            ...queryAttribute,
            ...queryCategory,
            ...queryPrice,
            ...queryTab,
        })
            .sort(querySort)
            .skip(skip)
            .limit(limit)
            .populate([
                {
                    path: "attributes",
                    populate: [
                        {
                            path: "color",
                            model: "Color",
                        },
                        {
                            path: "size",
                            model: "Size",
                        },
                    ],
                },
                "category",
            ])
            .exec();

        const countProduct = await ProductModel.countDocuments({
            ...queryKeyword,
            ...queryAttribute,
            ...queryCategory,
            ...queryPrice,
            ...queryTab,
        });

        const result = formatDataPaging({
            limit,
            pageIndex,
            data: listProduct,
            count: countProduct,
        });
        return res.status(STATUS.OK).json(result);
    } catch (error) {
        return res.status(STATUS.INTERNAL).json({
            message: error.message,
        });
    }
}