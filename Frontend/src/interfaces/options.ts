export interface OptionsType {
    page: number;
    pageSize: number;
    sort?: string | number;
    _order?: string;
    tab: 1;
    totalPages?: number;
    totalItems?: number;
}
export interface typeResponse {
    currentPage: number;
    totalPages: number; //tổng số phần tử
    totalItems: number;
}