const express = require('express');
const route = express.Router();
const api = require('./api/api');

route.use('/api',api);

module.exports = route;