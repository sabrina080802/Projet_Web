const express = require('express');
const router = express.Router();
const Products = require('../../services/Products');

router.get('/api/products/getCategories', async (req, res) => {
    res.json(await Products.getCategories());
});

module.exports = router;
