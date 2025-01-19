export interface DataPage<T> {
    pageNumber: number,
    pageCount: number,
    minPrice: number,
    maxPrice: number,
    data: T[]
}

export const emptyPage = { pageNumber: 1, pageCount: 1, data: [], minPrice: 0, maxPrice: 9999 };