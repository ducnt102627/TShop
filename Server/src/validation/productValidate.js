import Joi from "joi";

export const sizeValidate = Joi.object({
    name: Joi.string().required().messages({}),
    minHeight: Joi.number().required().messages({}),
    maxHeight: Joi.number().required().messages({}),
    minWeight: Joi.number().required().messages({}),
    maxWeight: Joi.number().required().messages({}),
})
export const colorValidate = Joi.object({
    name: Joi.string().required().messages({}),
    code: Joi.string().required().min(7).messages({})
})
export const productValidate = Joi.object({
    name: Joi.string().required().messages({}),
    category: Joi.string().required().messages({}),
    price: Joi.number().required().messages({}),
    image: Joi.array().required().messages({}),
    thumbnail: Joi.array().messages({}),
    description: Joi.string().required().min(12).messages({}),
    discount: Joi.number(),
    quantitySold: Joi.number(),
    quantity: Joi.number(),
    countInStock: Joi.number(),
    featured: Joi.boolean(),
    tags: Joi.array().items(Joi.string()),
    attribute: Joi.array().items(Joi.object().required().messages({}))
})
export const categoryValidate = Joi.object({
    name: Joi.string().required().messages({}),
    slug: Joi.string().messages({}),

})
