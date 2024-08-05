import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const colorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    deleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true }
)
colorSchema.plugin(mongoosePaginate);
export default mongoose.model("Color", colorSchema)