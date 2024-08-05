import instance from "@/configs/axios";
import { OptionsType } from "@/interfaces/options";
import { ISize } from "@/interfaces/size";

export const getPaginate = (options: OptionsType) => {
    const uri = `/size/paginate`;
    return instance.post(uri, options);
}
export const addSize = (data: ISize) => {
    const uri = `/size/add`;
    return instance.post(uri, data);
}
export const updateSize = (data: ISize) => {
    const uri = `/size/update/${data._id}`;
    return instance.put(uri, data);
}
export const hiddenSize = (id: string | boolean) => {
    const uri = `/size/delSort/${id}`;
    return instance.delete(uri);
}
export const getAllSizes = () => {
    const uri = `/size/getAll`;
    return instance.get(uri);
}
export const getSizeById = (id: string) => {
    const uri = `/size/get/${id}`;
    return instance.get(uri);
}
export const restoreSizeById = (id: string) => {
    const uri = `/size/restore/${id}`;
    return instance.put(uri);
}