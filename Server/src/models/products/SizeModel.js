import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2"
const sizeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        minHeight: { type: Number, required: true },
        maxHeight: { type: Number, required: true },
        minWeight: { type: Number, required: true },
        maxWeight: { type: Number, required: true },
        deleted: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
)
sizeSchema.plugin(mongoosePaginate);
sizeSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: "all" });
export default mongoose.model("Size", sizeSchema)