const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
    drug: { type: mongoose.Schema.Types.ObjectId, ref: 'Drug' },
    interaction: { type: String, required: true },
    severity: { type: String, required: true },
    source: { type: String, required: true },
});

const drugSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    interactions: [interactionSchema],
});

const Drug = mongoose.model('Drug', drugSchema);

module.exports = Drug;
