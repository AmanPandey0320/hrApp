const express=require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const admin = require('../admin');
const mailer = require('../mailer');
const { error } = require('jquery');

const db = admin.firestore();
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended:true}));

route.post('/',(req,res)=>{
    var verifyURL='https://app2pcon2k20.web.app';
        var dom=`<h1>Welcome</h1><br>Thanks for signing up with us. Hope you enjoy quizing with us.<br><h3> Let us verify it's really you.</h3>Click <a href="${verifyURL}" >here</a> to verify <br> For any query you can write to us @ 2000amanpandey@gmail.com <br>Thank you<br> Team Quizrr...`;
    var data = req.body;
    var email = `${data.email}`
    // console.log(data);
    admin.auth().createUser({
        email:`${data.email}`,
        password:`${data.password}`,
        emailVerified:false,
    }).then((user)=>{
        var uid = `${user.uid}`;
        db.collection('company').doc(uid).set(data).then((value)=>{
            //current mail options
            var mailOptions={
                from:'darkphoenix09199@gmail.com',
                to:email,
                subject:'verification',
                html:dom,
              };
              //sending mail to the user email id
            mailer.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log(error);
                }else{
                    console.log('mail sent to '+email);
                }
            });
            var resData = {
                uid:`${user.uid}`,
                status:'200',
            };
            res.json(resData);
        }).catch((error)=>{
            res.status(451).json(error);
        });
        
    }).catch((error)=>{
        res.status('400').json(error);
    });
});

module.exports = route;