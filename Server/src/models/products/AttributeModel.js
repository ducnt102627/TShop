import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const attributeSchema = new mongoose.Schema(
    {
        color: {
            type: mongoose.Types.ObjectId,
            ref: "Color",
            required: true
        },
        size: {
            type: mongoose.Types.ObjectId,
            ref: "Size",
            required: "true"
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        deleted: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
)
attributeSchema.plugin(mongoosePaginate)
export default mongoose.model("Attribute", attributeSchema)