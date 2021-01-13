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
        res.status('400').json(error);
    });
});

route.get('/verification',async (req,res)=>{
    var query = req.query;
    var uid= query.uid;
    var data = [];
    var querySnapshot = db.collection('company').doc(uid).collection('verification');
    var snapshot = await querySnapshot.get('verification');
    snapshot.forEach( doc =>{
        data.push(doc.data());
    });
    res.json({
        result:data
    });
});

route.post('/verification',async (req,res)=>{
    var query = req.query;
    var uid= query.uid;
    var data = [];
    var querySnapshot = db.collection('company').doc(uid).collection('verification');
    var snapshot = await querySnapshot.get('verification');
    snapshot.forEach( doc =>{
        data.push(doc.data());
    });
    res.json({
        result:data
    });
});

module.exports = route;