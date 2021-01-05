const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended:true}));

route.post('/post',(req,res)=>{
    var body = req.body;
    console.log(body);
    res.json(body);
});

module.exports = route;