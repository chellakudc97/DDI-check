const express = require('express');
const { getDrugs, checkInteraction } = require('../controllers/drugController');
const router = express.Router();

router.get('/', getDrugs);
router.post('/check', checkInteraction);

module.exports = router;
