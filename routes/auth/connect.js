const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/jwt');
const bcrypt = require('bcryptjs');
const config = require('../../config');
const router = express.Router();
const User = require('../../services/User');

router.post('/api/auth/connect', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findByUsername(email);
    if (!user) {
        return res.status(400).json({ message: 'Utilisateur introuvable ' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        config.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );

    res.json({
        success: true,
        token,
        user: {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.address,
            city: user.city,
            postal_code: user.postal_code,
            country: user.country,
            phone: user.phone
        }
    });
});


module.exports = router;