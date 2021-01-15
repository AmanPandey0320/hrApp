const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const admin = require('../admin');
const generator = require('generate-password');
const mailer = require('../mailer');

const db = admin.firestore();
const auth = admin.auth();

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended:true}));

//functions
var getCompanyData = async (cid)=>{
    var docRef = db.collection('company').doc(cid);
    var documentSnapshot = await docRef.get();
    var data = await documentSnapshot.data();
    return data;
}
var sendMail = (email,emailDOM,subject)=>{
    var mailOptions={
        from:'darkphoenix09199@gmail.com',
        to:email,
        subject:subject,
        html:emailDOM,
      };
      //sending mail to the user email id
    mailer.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error);
        }else{
            console.log('mail sent to '+email);
        }
    });
};
//routes
route.get('/toverify',(req,res)=>{
    var employee = {
        name:"aman",
        id:"1234",
    }
    res.json(employee);
});

route.post('/accept',async (req,res)=>{
    var body = req.body;
    // console.log(body);
    var email = body.employeeEmail;
    var name = body.empname;
    var cid = body.companyID;
    var eid = body.employeeID;
    var company = await getCompanyData(cid);
    // console.log(company);
    var cName = company.companyName;
    var cEmail = company.email;
    var password = generator.generate({
        length:10,
        numbers:true
    });
    var emailDOM = `<h1>Welcome to ${cName}</h1><br>Thanks for signing up with us. Hope you enjoy working with us.<br><h4>We have accepted your request to join us on ManageHr platform.</h4><br>You can now sign in as an employee with your email-ID and password: <strong>${password}</strong><br> For any query you can write to us @ ${cEmail} <br>Thank you<br> Team ManageHr...`
    // console.log(password);
    // sendMail(email,emailDOM,'Your joining request accepted!');
    auth.createUser({
        email: email,
        password: password,
        emailVerified:true,
        uid:eid,
    }).then((user)=>{
        db.collection('employee').doc(eid).set(body).then((result)=>{
            db.collection('company').doc(cid).collection('employee').doc(eid).set(body).then(val =>{
                db.collection('company').doc(cid).collection('verification').doc(eid).delete();
            }).catch(error =>{
                console.log('company/accept/eemployee/company/cid/employee/eid/db');
            });
        }).catch(error =>{
            console.log('company/accept/employee/eid/db');
            res.sendStatus(400);
        })
    }).catch(error =>{
        console.log('company/accept/auth');
        res.sendStatus(401);
    });
    
    res.json(body);
});


module.exports = route;