// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const userRoutes = require('./routes/user');
const drugRoutes = require('./routes/drug');

const app = express();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Middleware
app.use(bodyParser.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/drugs', drugRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
