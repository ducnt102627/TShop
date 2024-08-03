export interface ISize {
    _id: string;
    name: string;
    deleted?: boolean;
    createdAt?: string,
    minHeight?: number;
    maxHeight?: number;
    minWeight?: number;
    maxWeight?: number;
}