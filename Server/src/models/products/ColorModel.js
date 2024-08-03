import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import mongooseDelete from "mongoose-delete"

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
colorSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
export default mongoose.model("Color", colorSchema)