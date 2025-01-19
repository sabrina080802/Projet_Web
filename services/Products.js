const db = require('../mysql/db');

module.exports = class Products {
    static productPerPage = 5;

    static async getProductById(id) {
        const [rows] = await db.execute('SELECT * FROM product WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    }
    static async getCategories() {
        const [rows] = await db.execute('SELECT * FROM product_category;');
        console.log('Getting categories');
        return rows;
    }
    static async getProducts(filters) {
        let params = Products.getQueryFilter(filters);
        let query = 'SELECT * FROM product';

        if (params.length > 0) {
            query += ' WHERE ' + params.map(x => x.query).join(' AND ');
        }
        params = [
            ...params.filter(x => x.data).map(x => x.data),
            (filters.pageNumber - 1) * Products.productPerPage,
            Products.productPerPage
        ];
        query += ' LIMIT ?, ?';

        const [rows] = await db.query(query, params);
        return rows;
    }
    static async getFilterStats(filters) {
        let params = Products.getQueryFilter({
            searchName: filters.searchName,
            categories: filters.categories
        });

        let query = 'SELECT MIN(price) as minPrice, MAX(price) as maxPrice FROM product';
        if (params.length > 0) {
            query += ' WHERE ' + params.map(x => x.query).join(' AND ');
            params = params.filter(x => x.data).map(x => x.data);
        }

        const [rows] = await db.execute(query, params);
        return rows[0];
    }
    static async getProductsCount(filters) {
        let params = Products.getQueryFilter(filters);
        let query = 'SELECT COUNT(*) AS productCount FROM product';
        if (params.length > 0) {
            query += ' WHERE ' + params.map(x => x.query).join(' AND ');
            params = params.filter(x => x.data).map(x => x.data);
        }

        const [rows] = await db.execute(query, params);
        return rows[0].productCount;
    }
    static getQueryFilter(filters) {
        const params = [];
        if (filters.searchName && filters.searchName != '') {
            params.push({ query: 'name LIKE ?', data: '%' + filters.searchName + '%' });
        }
        if (filters.minPrice && filters.minPrice > 0) {
            params.push({ query: 'price >= ?', data: filters.minPrice });
        }
        if (filters.maxPrice && filters.maxPrice > 0) {
            params.push({ query: 'price <= ?', data: filters.maxPrice });
        }
        if (filters.categories && filters.categories.length > 0) {
            if (filters.categories instanceof Array) {
                params.push({ query: `category IN (${filters.categories.join(',')})` });
            }
            else if (filters.categories != '' && filters.categories > -1)
                params.push({ query: 'category = ?', data: filters.categories });
        }

        return params;
    }
}