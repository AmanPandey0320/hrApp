const express=require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const admin = require('../admin');

const db = admin.firestore();
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended:true}));

var json={
    id:"1245",
    name:"Aman Kr pandey",
    role:"developer",
};

route.get('/',(req,res)=>{
    db.collection('check').add({foo:"aman"}).then((value)=>{
        res.json(json);
    }).catch((error)=>{
        console.log(error.message);
    });
});

module.exports = route;