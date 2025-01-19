const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token){
        return res.status(403).json({ message: 'Accès refusé. Token manquant' });
    }

    try{
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        req.user = decoded;

        next();
    }
    catch(err){
        return res.status(400).json({ message: 'Token invalide.' });
    }
}

module.exports = verifyToken;