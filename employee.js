const express = require('express');
const route = express.Router();

const path = require('path');

const api = require('./api/api');

route.use('/api',api);
route.use('/',express.static('views'));

route.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'./views/employeesignup.html'));
});

route.get('/profile',(req,res)=>{
    res.sendFile(path.join(__dirname,'./views/empdetails.html'))
})

module.exports = route