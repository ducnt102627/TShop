import mongoose from "mongoose";


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
            type: String,
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
        tags: {
            type: Array,
        },
        attribute: {
            type: mongoose.Types.ObjectId,
            ref: "Attribute"
        }
    },
    { timestamps: true }
)
export default mongoose.model("Product", productSchema)