import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: Array,
            required: true
        },
        thumbnail: {
            type: Array,
        },
        description: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
        },
        quantitySold: {
            type: Number,
            default: 0,
        },
        quantity: {
            type: Number,
            default: 0,
        },
        countInStock: {
            type: Number,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        tags: [{
            type: String,
        }],
        attribute: [{
            type: mongoose.Types.ObjectId,
            ref: "Attribute"
        }],
        deleted: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            default: 0,
        },
        ratingCount: {
            type: Number,
            default: 0,
        },
        ratingQuantity: {
            type: Number,
            default: 0,
        }
    },
    { timestamps: true }
)
productSchema.plugin(mongoosePaginate);
export default mongoose.model("Product", productSchema)