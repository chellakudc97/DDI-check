const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./routes/user');
const drugRoutes = require('./routes/drug');
const ddiRoutes = require('./routes/ddi');

const app = express();

// Middleware
app.use(bodyParser.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/drugs', drugRoutes);
app.use('/api/ddi', ddiRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
