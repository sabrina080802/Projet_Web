const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/jwt');
const User = require('../../services/User');
const router = express.Router();

router.put('/api/auth/updatePassword', verifyToken, (req, res) => {
    User.updateUserPassword(req.user, req.body.password);
    res.json({ success: true });
});

module.exports = router;