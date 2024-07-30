import instance from "@/configs/axios";

export const getAllCategories = (options: any) => {
    const uri = `/category/getAll`;
    return instance.get(uri);
}
export const hiddenCate = (id: string | boolean) => {
    const uri = `/category/delSort/${id}`;
    return instance.delete(uri)
}
export const getHiddenList = () => {
    const uri = `/category/getDeleted`;
    return instance.get(uri);
}
export const unHiddenCate = (id: string | boolean) => {
    const uri = `/category/restore/${id}`;
    return instance.put(uri);
}
