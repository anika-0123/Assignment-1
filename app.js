const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Connect DB
connectDB();

// Set view engine and views path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // for form submissions
app.use(bodyParser.json());

// Serve static files if any (like css)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', taskRoutes);

module.exports = app;
