const express = require('express');
let ejs =require('ejs');
const e = require('express');
const { query } = require('express');
const app = express();
const path = require('path');
const port = 5560;

const nodemailer=require('nodemailer');
const fetch =require('node-fetch');
const admin = require('./admin');

const bodyParser = require('body-parser');

//api routes
const signup = require('./api/signup');


const { error } = require('jquery');



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

//home route
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname,'./views/home.html'));
});

app.get('/signup',(req,res)=>{
  res.sendFile(path.join(__dirname,'./views/signup.html'));
});



app.listen(port, () => console.log(`Example app listening on port ${port}`));