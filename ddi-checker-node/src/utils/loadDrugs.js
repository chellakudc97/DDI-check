const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Drug = require('../models/Drug');

const loadDrugs = async () => {

    await Drug.deleteMany({});

    const drugs = new Map();

    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '../../ddi_data.csv'))
            .pipe(csv({ separator: ';' })) // Use semicolon as the delimiter
            .on('headers', (headers) => {
                console.log('CSV Headers:', headers);
            })
            .on('data', (row) => {
                console.log(row, "ROW");
                const drug1 = row['drug1'];
                const drug2 = row['drug2'];
                const interactionData = {
                    drug1: row['drug1'],
                    object: row['object'],
                    drug2: row['drug2'],
                    precipitant: row['precipitant'],
                    certainty: row['certainty'],
                    contraindication: row['contraindication'],
                    dateAnnotated: row['dateAnnotated'],
                    ddiPkEffect: row['ddiPkEffect'],
                    ddiPkMechanism: row['ddiPkMechanism'],
                    effectConcept: row['effectConcept'],
                    homepage: row['homepage'],
                    label: row['label'],
                    numericVal: row['numericVal'],
                    objectUri: row['objectUri'],
                    pathway: row['pathway'],
                    precaution: row['precaution'],
                    precipUri: row['precipUri'],
                    severity: row['severity'],
                    uri: row['uri'],
                    whoAnnotated: row['whoAnnotated'],
                    source: row['source'],
                    ddiType: row['ddiType'],
                    evidence: row['evidence'],
                    evidenceSource: row['evidenceSource'],
                    evidenceStatement: row['evidenceStatement'],
                    researchStatementLabel: row['researchStatementLabel'],
                    researchStatement: row['researchStatement']
                };

                if (!drugs.has(row['object'])) {
                    drugs.set(row['object'], { name: row['object'], interactions: [] });
                }
                drugs.get(row['object']).interactions.push(interactionData);
            })
            .on('end', async () => {
                console.log('CSV file successfully processed');

                for (let [name, data] of drugs.entries()) {
                    let drug = new Drug(data);
                    await drug.save();
                }
                console.log('Drugs data loaded');
                resolve();
            })
            .on('error', (error) => {
                console.error('Error reading CSV file:', error);
                reject(error);
            });
    });
};

module.exports = loadDrugs;
