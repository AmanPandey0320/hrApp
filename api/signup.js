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
    admin.auth().createUser({
        email:`${data.email}`,
        password:`${data.password}`,
        emailVerified:false,
    }).then((user)=>{
        var resData = {
            uid:`${user.uid}`,
            status:'200',
        };
        res.json(resData);
    }).catch((error)=>{
        res.status('400').json(error);
    });
});

module.exports = route;