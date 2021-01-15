const express = require('express');
const route = express.Router();

const path = require('path');

const api = require('./api/api');

route.use('/api',api);
route.use('/',express.static('views'));

route.get('/verification',(req,res)=>{
    res.sendFile(path.join(__dirname,'./views/empVerification.html'));
})

module.exports = route;