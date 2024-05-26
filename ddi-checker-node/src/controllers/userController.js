const User = require('../models/User');
const Drug = require('../models/Drug');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { firstname, lastname, type, gender, birthdate, SVNR, email, password } = req.body;
        let user = new User({ firstname, lastname, type, gender, birthdate, SVNR, email, password });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPatients = async (req, res) => {
    try {
        const physicianId = req.body.user._id;
        const patients = await User.find({ type: 'patient', assignedPhysicians: physicianId });
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await User.find({ type: 'patient' });
        res.json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.assignPatient = async (req, res) => {
    const { patientId, physicianId } = req.body;
    try {
        const patient = await User.findById(patientId);
        if (!patient || patient.type !== 'patient') {
            return res.status(404).json({ error: 'Patient not found' });
        }

        patient.assignedPhysicians.push(physicianId);
        await patient.save();
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPatientDrugs = async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await User.findById(id).populate('drugs');
        res.json(patient.drugs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.assignDrugToPatient = async (req, res) => {
    const { id } = req.params;
    const { drugId } = req.body;
    try {
        const patient = await User.findById(id);
        if (!patient || patient.type !== 'patient') {
            return res.status(404).json({ error: 'Patient not found' });
        }

        patient.drugs.push(drugId);
        await patient.save();
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
