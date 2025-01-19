const verifyToken = require('../../middleware/jwt');
const express = require('express');
const Basket = require('../../services/Basket');
const Products = require('../../services/Products');
const router = express.Router();

router.delete('/api/basket/drop', verifyToken, async (req, res) => {
    const product = await Products.getProductById(req.query.product);
    if (product == null) {
        res.status(404).json({ success: false, error: 'Ce produit n\'existe pas' });
    }
    else {
        await Basket.dropProduct(req.user.id, product);
        res.json({ success: true, data: await Basket.getContent(req.user.id) });
    }
});

module.exports = router;