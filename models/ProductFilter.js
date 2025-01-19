module.exports = class ProductFilter {
    searchName = '';
    minPrice = 0;
    maxPrice = -1;
    categories = [];
    pageNumber = 0;

    constructor(searchName, minPrice, maxPrice, categories, pageNumber) {
        this.searchName = searchName;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.categories = categories;
        this.pageNumber = pageNumber;
    }
}