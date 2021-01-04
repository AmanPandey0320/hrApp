const express=require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const admin = require('../admin');

const db = admin.firestore();
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended:true}));

route.post('/',(req,res)=>{
    var data = req.body;
    // console.log(data);
    res.json(data);
});

module.exports = route;