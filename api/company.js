const express = require('express');
const route = express.Router();

route.get('/toverify',(req,res)=>{
    var employee = {
        name:"aman",
        id:"1234",
    }
    res.json(employee);
});

module.exports = route;