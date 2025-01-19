const verifyToken = require('../../middleware/jwt');
const express = require('express');
const User = require('../../services/User');
const router = express.Router();

router.put('/api/user/updateProfil', verifyToken, async (req, res) => {
    const { email, firstname, lastname, phone, address, country, city, postal_code } = req.body;
    if (email != req.user.email) {
        if (await User.findByUsername(email)) {
            res.json({ success: false, error: 'Cet email est déjà pris' });
            return;
        }
    }

    const user = await User.findByUsername(req.user.email);
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.city = city;
    user.country = country;
    user.postal_code = postal_code;

    User.updateUserProfil(user);
    res.json({ success: true });
});

module.exports = router;
