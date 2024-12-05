const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, (req, res) => {
    res.status(200).json({ message: 'You have access to this route' });
});

module.exports = router;
