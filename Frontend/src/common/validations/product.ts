import z from "zod"

const formProductSchema = z.object({
    name: z.string().nonempty("Nhập tên sản phẩm"),
    price: z.number().min(1, "Phải lớn hơn 0"),
    description: z.string().nonempty("Nhập mô tả sản phẩm"),
    discount: z.number().min(1, "Phải lớn hơn 0"),
    image: z.array(z.string().url("Ảnh phải là một URL hợp lệ"),),
    // quantity: z.number().min(1, "Phải lớn hơn 0"),
    category: z.object({ _id: z.string(), name: z.string(), })
        .refine((data) => {
            if (!data?._id) return false
            return true

        }, {
            message: "Chọn danh mục",
        }),
    featured: z.boolean(),
    attribute: z
        .array(
            z.object({
                color: z
                    .object({
                        _id: z.string(),
                        name: z.string().nonempty("Bạn chưa nhập loại sản phẩm"),
                    })
                    .refine((data) => {
                        if (!data?._id) return false
                        return true

                    }, {
                        message: "Chọn màu",
                    }),
                size: z
                    .object({
                        _id: z.string().nonempty("Bạn chưa nhập loại sản phẩm"),
                        name: z.string(),
                    })
                    .refine((data) => {
                        if (!data?._id) return false
                        return true

                    }, {
                        message: "Chọn kích thước",
                    }),
                price: z.number().min(1, "Phải lớn hơn 0"),
                quantity: z.number().min(1, "Phải lớn hơn 0"),
            }),
        ).refine(
            (arr) => {
                const prices = arr.map((item) => item.price);
                const combinations = arr.map((item) => `${item.color._id}-${item.size._id}`);
                return new Set(combinations).size === combinations.length;
            },
            {
                message: "Bạn nhập trùng màu và kích cỡ",
            },
        ),
})
export default formProductSchema;