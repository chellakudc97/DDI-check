const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Drug = require('../models/Drug');

mongoose.connect('mongodb://localhost:27017/ddi-checker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const loadDrugs = async () => {
    const drugs = new Map();

    fs.createReadStream(path.join(__dirname, '../../CombinedDatasetConservativeTWOSIDES.csv'))
        .pipe(csv())
        .on('data', (row) => {
            const drug1 = row['Drug1'];
            const drug2 = row['Drug2'];
            const interaction = row['Interaction'];
            const severity = row['Severity'];
            const source = row['Source'];

            if (!drugs.has(drug1)) {
                drugs.set(drug1, []);
            }
            drugs.get(drug1).push({
                drug: drug2,
                interaction,
                severity,
                source,
            });

            if (!drugs.has(drug2)) {
                drugs.set(drug2, []);
            }
            drugs.get(drug2).push({
                drug: drug1,
                interaction,
                severity,
                source,
            });
        })
        .on('end', async () => {
            console.log('CSV file successfully processed');

            for (let [name, interactions] of drugs.entries()) {
                let drug = new Drug({ name, interactions });
                await drug.save();
            }
            console.log('Drugs data loaded');
            mongoose.connection.close();
        });
};

loadDrugs();
