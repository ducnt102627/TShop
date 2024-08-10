export interface IProduct {
    _id?: string;
    name: string;
    slug?: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
    image: string;
    color: string[];
    size: string[];
    deleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    views?: number;
    tags?: string[];
    attribute: string[];
    featured?: boolean;
    discount: number;
}