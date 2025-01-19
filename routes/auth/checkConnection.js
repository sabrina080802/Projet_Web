const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../middleware/jwt');
const router = express.Router();

router.get('/api/auth/checkConnection', verifyToken, (req, res) => {
    res.json({ isConnected: true });
});

module.exports = router;