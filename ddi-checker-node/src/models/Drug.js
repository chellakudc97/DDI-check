const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interactionSchema = new Schema({
    drug1: { type: String, required: true },
    object: { type: String, required: true },
    drug2: { type: String, required: true },
    precipitant: { type: String, required: true },
    certainty: { type: String, required: true },
    contraindication: { type: String, required: true },
    dateAnnotated: { type: String, required: true },
    ddiPkEffect: { type: String, required: true },
    ddiPkMechanism: { type: String, required: true },
    effectConcept: { type: String, required: true },
    homepage: { type: String, required: true },
    label: { type: String, required: true },
    numericVal: { type: String, required: true },
    objectUri: { type: String, required: true },
    pathway: { type: String, required: true },
    precaution: { type: String, required: true },
    precipUri: { type: String, required: true },
    severity: { type: String, required: true },
    uri: { type: String, required: true },
    whoAnnotated: { type: String, required: true },
    source: { type: String, required: true },
    ddiType: { type: String, required: true },
    evidence: { type: String, required: true },
    evidenceSource: { type: String, required: true },
    evidenceStatement: { type: String, required: true },
    researchStatementLabel: { type: String, required: true },
    researchStatement: { type: String, required: true }
});

const drugSchema = new Schema({
    name: { type: String, required: true },
    interactions: [interactionSchema]
});

module.exports = mongoose.model('Drug', drugSchema);
