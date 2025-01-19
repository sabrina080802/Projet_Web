const verifyToken = require('../../middleware/jwt');
const express = require('express');
const Cards = require('../../services/Cards');
const router = express.Router();

router.post('/api/cards/create', verifyToken, async (req, res) => {
    console.log(req.body);
    const { number, cvc, expire, owner } = req.body;
    if (Cards.isValidNumber(number) == false)
        res.status(400).json({ success: false, error: 'Le numéro de carte est invalide' });
    else if (Cards.isValidCVC(cvc) == false)
        res.status(400).json({ success: false, error: 'Le numéro CVC est invalide' });
    else if (owner.length < 5 || owner.includes(' ') == false)
        res.status(400).json({ success: false, error: 'Le propriétaire de la carte est mal renseigné' });
    else {
        const expiryDate = new Date(expire);
        const now = new Date();
        if (now.getTime() > expiryDate.getTime()) {
            res.status(400).json({ success: false, error: 'Vous ne pouvez pas fournir une carte qui a déjà expiré' });
        }
        else {
            const newCard = await Cards.createCard(req.user.id, { number, cvc, expiryDate, owner });
            res.json({ success: true, data: newCard });
        }
    }

});

module.exports = router;