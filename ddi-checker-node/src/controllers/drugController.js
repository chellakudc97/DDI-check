const Drug = require('../models/Drug');

exports.getDrugs = async (req, res) => {
    try {
        const drugs = await Drug.find().select('name');
        res.json(drugs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllDrugs = async (req, res) => {
    try {
        const drugs = await Drug.find();
        res.json(drugs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.checkInteraction = async (req, res) => {
    const { drug1, drug2 } = req.body;

    try {
        const drugs = await Drug.find();
        let interaction = null;

        for (let drug of drugs) {
            interaction = drug.interactions.find(
                interaction => 
                    (interaction.object === drug1 && interaction.precipitant === drug2) ||
                    (interaction.object === drug2 && interaction.precipitant === drug1)
            );
            if (interaction) break; // If interaction is found, break the loop
        }
        console.log(interaction);
        if (interaction) {
            res.json({ label: interaction.label });
        } else {
            res.json({ label: "No special interaction known" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
