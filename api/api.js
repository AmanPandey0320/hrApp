const express = require('express');
const route = express.Router();
const employee = require('./employee');
const company = require('./company');

route.use('/employee',employee);
route.use('/company',company);


module.exports = route;