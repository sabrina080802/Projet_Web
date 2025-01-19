const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../services/User');
const router = express.Router();

router.post('/api/auth/register', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const user = await User.findByUsername({ email });
    if (user) {
        return res.status(400).json({ success: false, error: 'L\'email est déjà pris' });
    }

    const pwd = bcrypt.hashSync(password);

    await User.createUser(firstname, lastname, email, password);

    res.json({ success: true });
});

module.exports = router;