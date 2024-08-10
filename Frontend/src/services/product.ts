import instance from "@/configs/axios";
import { OptionsType } from "@/interfaces/options";
import { IProduct } from "@/interfaces/product";

export const getPaginate = (options: OptionsType) => {
    const uri = `/product/paginate`;
    return instance.post(uri, options);
}
export const addProduct = (data: IProduct) => {
    const uri = `/product/add`;
    return instance.post(uri, data);
}
export const upateProduct = (data: IProduct) => {
    const uri = `/product/update/${data._id}`;
    return instance.post(uri, data);
}
export const getProductById = (id: string) => {
    const uri = `/product/get/${id}`;
    return instance.get(uri);
}
export const getProductBySlug = (slug: string) => {
    const uri = `/product/get/slug/${slug}`;
    return instance.get(uri);
}
export const updateProduct = (data: IProduct) => {
    const uri = `/product/update/${data._id}`;
    return instance.put(uri, data);
}
export const hiddenProduct = (id: string | boolean) => {
    const uri = `/product/delSort/${id}`;
    return instance.delete(uri);
}
export const getAllProducts = () => {
    const uri = `/product/getAll`;
    return instance.get(uri);
}
export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
