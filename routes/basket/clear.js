const verifyToken = require('../../middleware/jwt');
const express = require('express');
const Basket = require('../../services/Basket');
const router = express.Router();

router.delete('/api/basket/clear', verifyToken, async (req, res) => {
    Basket.clear(req.user.id);
    res.json({ success: true });
});

module.exports = router;