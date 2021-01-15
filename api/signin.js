const express = require('express');
const route = express.Router();
const admin = require('../admin');
const bodyParser = require('body-parser');


const auth = admin.auth();
const db = admin.firestore();

route.use('/',bodyParser.json());
route.use('/',bodyParser.urlencoded({extended:true}));

route.post('/',(req,res)=>{
    var body = req.body;
    var e = body.email;
    var p = body.password;
    var t = body.type;
    auth.getUserByEmail(e).then((user)=>{
        var uid = user.uid;
        if(user.emailVerified == true)
        {
            db.collection(t).doc(uid).get().then((documentSnapshot)=>{
                var data = documentSnapshot.data();
                // console.log(data);
                if(data.password == p){
                    res.status(200).send(uid);
                }else{
                    error={
                        code:'401 unauthorised',
                        message:'Either the email or password in wrong.'
                    };
                    res.status(401).json(error);
                }
            }).catch((error)=>{
                console.log(`signin error db : ${error}`);
                res.status(404).json(error);
            });
        }else{
            var error = {
                code:'401 unauthorised',
                message:'email-id is not verified!'
            }
            res.status(401).json(error);
        }
        
    }).catch((error)=>{
        console.log(`sign in error auth : ${error}`);
        res.status(401).json(error);
    });
});
module.exports = route;