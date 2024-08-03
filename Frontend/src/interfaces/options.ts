export interface OptionsType {
    page: number;
    pageSize: number;
    sort?: 1 | -1;
    tab: 1;
    totalPages?: number;
    totalItems?: number;
}
export interface typeResponse {
    currentPage: number;
    totalPages: number; //tổng số phần tử
    totalItems: number;
}