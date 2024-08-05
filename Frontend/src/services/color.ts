import instance from "@/configs/axios";
import { IColor } from "@/interfaces/color";
import { OptionsType } from "@/interfaces/options";

export const getPaginate = (options: OptionsType) => {
    const uri = `/color/paginate?${options}`;
    return instance.post(uri, options);
}
export const addColor = (data: IColor) => {
    const uri = `/color/add`;
    return instance.post(uri, data);
}
export const updateColor = (data: IColor) => {
    const uri = `/color/update/${data._id}`;
    return instance.put(uri, data);
}
export const hiddenColor = (id: string | boolean) => {
    const uri = `/color/delSort/${id}`;
    return instance.delete(uri);
}
export const getAllColors = () => {
    const uri = `color/getAll`;
    return instance.get(uri);
}
export const getColorById = (id: string) => {
    const uri = `/color/get/${id}`;
    return instance.get(uri);
}
export const restoreColor = (id: string) => {
    const uri = `/color/restore/${id}`;
    return instance.put(uri);
}