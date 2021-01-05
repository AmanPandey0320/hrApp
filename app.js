const express = require('express');
let ejs =require('ejs');
const app = express();
const path = require('path');
const port = 5560;

const nodemailer=require('nodemailer');
const fetch =require('node-fetch');
const admin = require('./admin');

const bodyParser = require('body-parser');

//api routes
const signup = require('./api/signup');
const signin = require('./api/signin');



const db=admin.firestore();
app.set('view engine', 'ejs');

//email transporter
var transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'darkphoenix09199@gmail.com',
    pass:'Aman@4457',
  }
});

app.use('/',bodyParser.json());
app.use('/',express.static('assets'));
app.use('/',express.static('views'));

//api routes
app.use('/register',signup);
app.use('/signin',signin);

//error routes
app.get('/error',(req,res)=>{
  res.render('error',{
    code:req.query.code,
    message:req.query.message,
  });
});

//home route
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname,'./views/home.html'));
});

//signup route
app.get('/signup',(req,res)=>{
  res.sendFile(path.join(__dirname,'./views/signup.html'));
});

//verify route
app.get('/verify',(req,res)=>{
  var uid = req.query.uid;
  console.log(uid);
  admin.auth().updateUser(uid,{
    emailVerified:true,
  }).then((user)=>{
    res.sendFile(path.join(__dirname,'./views/home.html'));
  }).catch((error)=>{
    console.log(error);
    res.render('error');
  });
});



app.listen(port, () => console.log(`Example app listening on port ${port}`));
