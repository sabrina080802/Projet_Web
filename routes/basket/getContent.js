const verifyToken = require('../../middleware/jwt');
const express = require('express');
const Basket = require('../../services/Basket');
const router = express.Router();

router.get('/api/basket/getContent', verifyToken, async (req, res) => {
    const basketContent = await Basket.getContent(req.user.id);
    res.json({ success: true, data: basketContent });
});

module.exports = router;