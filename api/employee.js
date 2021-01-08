const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const admin = require('../admin');

const db = admin.firestore();
const auth = admin.auth();

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended:true}));

route.post('/post',(req,res)=>{
    var body = req.body;
    var Cuid = body.companyID;
    var Euid = body.employeeID;
    db.collection('company').doc(Cuid).collection('verification').doc(Euid).set(body).then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
    });
});



module.exports = route;