const express = require('express');
const auth = require('./auth.routes.js');
const core = require('./core.routes.js');

const app = express();

app.use('/API/V1', [auth, core]);

module.exports = app;