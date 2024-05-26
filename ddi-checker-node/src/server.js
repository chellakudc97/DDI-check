const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const loadDrugs = require('./utils/loadDrugs');

const port = process.env.PORT || 3100;

const server = http.createServer(app);

mongoose.connect('mongodb://localhost:27017/ddi-checker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log('Connected to MongoDB');

    // Load drugs on startup
    try {
        await loadDrugs();
        console.log('Drugs loaded on startup');
    } catch (error) {
        console.error('Error loading drugs:', error);
    }

    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});
