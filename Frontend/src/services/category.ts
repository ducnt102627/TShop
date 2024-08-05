import instance from "@/configs/axios";
import { ICategory } from "@/interfaces/category";
import { OptionsType } from "@/interfaces/options";

export const getAllCategories = () => {
    const uri = `/category/getAll`;
    return instance.get(uri);
}
export const getPaginate = (options: OptionsType) => {
    const uri = `/category/getListPag`;
    return instance.post(uri, options);
}
export const hiddenCategory = (id: string | boolean) => {
    const uri = `/category/delSort/${id}`;
    return instance.delete(uri)
}
export const getHiddenList = () => {
    const uri = `/category/getDeleted`;
    return instance.get(uri);
}
export const restoreCategory = (id: string | boolean) => {
    const uri = `/category/restore/${id}`;
    return instance.put(uri);
}
export const addCategory = (data: ICategory) => {
    const uri = `/category/add`;
    return instance.post(uri, data);
}
export const updateCategory = (data: ICategory) => {
    const uri = `/category/update/${data._id}`;
    return instance.put(uri, data);
}
