const verifyToken = require('../../middleware/jwt');
const express = require('express');
const Cards = require('../../services/Cards');
const router = express.Router();

router.get('/api/cards/getAll', verifyToken, async (req, res) => {
    const cards = await Cards.getCards(req.user.id);
    res.json({ success: true, data: cards });
});

module.exports = router;