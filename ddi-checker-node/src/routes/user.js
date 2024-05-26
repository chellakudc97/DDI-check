const express = require('express');
const {
    register,
    login,
    getUser,
    getPatients,
    assignPatient,
    getAllPatients,
    getPatientDrugs,
    assignDrugToPatient
} = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', getUser);
router.post('/patients', getPatients); // Use POST method here
router.post('/assign-patient', assignPatient);
router.get('/all-patients', getAllPatients);
router.get('/patients/:id/drugs', getPatientDrugs);
router.post('/patients/:id/drugs', assignDrugToPatient);

module.exports = router;
