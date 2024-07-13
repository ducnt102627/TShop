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
            required: true
        }
    },
    { timestamps: true, versionKey: false }
)
CategorySchema.plugin(mongoosePaginate);
CategorySchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' })
export default mongoose.model("Category", CategorySchema)