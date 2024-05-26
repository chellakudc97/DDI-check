const express = require('express');
const { getDrugs, getAllDrugs, checkInteraction } = require('../controllers/drugController');
const router = express.Router();

router.get('/', getDrugs);
router.get('/', getAllDrugs);
router.post('/check', checkInteraction);

module.exports = router;
