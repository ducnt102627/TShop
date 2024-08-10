export interface IAttribute {
    _id?: string,
    colorId: string,
    sizeId: string,
    price: number,
    quantity: number,
    deleted?: boolean,
    deletedAt?: string,
    createdAt?: string,
}