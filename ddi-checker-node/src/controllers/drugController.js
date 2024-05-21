const Drug = require('../models/Drug');

exports.getDrugs = async (req, res) => {
    try {
        const drugs = await Drug.find().select('name');
        res.json(drugs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.checkInteraction = async (req, res) => {
    try {
        const { drugs } = req.body;
        const interactions = await Drug.find({
            name: { $in: drugs }
        }).populate('interactions.drug', 'name');

        const result = interactions.reduce((acc, drug) => {
            drug.interactions.forEach(interaction => {
                if (drugs.includes(interaction.drug.name)) {
                    acc.push({
                        drug1: drug.name,
                        drug2: interaction.drug.name,
                        interaction: interaction.interaction,
                        severity: interaction.severity,
                        source: interaction.source,
                    });
                }
            });
            return acc;
        }, []);

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
