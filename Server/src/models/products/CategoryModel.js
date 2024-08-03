import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import mongooseDelete from "mongoose-delete";
const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            unique: true,
        },
        deleted: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true, versionKey: false }
)
CategorySchema.plugin(mongoosePaginate);
export default mongoose.model("Category", CategorySchema)