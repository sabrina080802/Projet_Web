const express = require('express');
const router = express.Router();
const ProductFilter = require('../../models/ProductFilter');
const Products = require('../../services/Products');

router.get('/api/products/getProducts', async (req, res) => {
    const filter = new ProductFilter(
        req.query.searchName,
        Math.floor(parseInt(req.query.minPrice) * 100),
        Math.floor(parseInt(req.query.maxPrice) * 100),
        JSON.parse(req.query.categories),
        parseInt(req.query.pageNumber));
    const filtersStats = await Products.getFilterStats(filter);
    const productCount = await Products.getProductsCount(filter);

    res.json({
        pageNumber: parseInt(filter.pageNumber),
        minPrice: filtersStats.minPrice,
        maxPrice: filtersStats.maxPrice,
        pageCount: Math.round(productCount / Products.productPerPage),
        data: await Products.getProducts(filter),
    });
});

module.exports = router;