const express = require('express');
const route = express.Router();
const employee = require('./employee');

route.use('/employee',employee);


module.exports = route;