const verifyToken = require('../../middleware/jwt');
const express = require('express');
const Cards = require('../../services/Cards');
const router = express.Router();

router.delete('/api/cards/delete', verifyToken, async (req, res) => {
    const card = await Cards.getCard(req.user.id, req.query.card);
    if (card == null) {
        res.status(404).json({ success: false });
    }
    else {
        Cards.deleteCard(card);
        res.json({ success: true });
    }
});

module.exports = router;