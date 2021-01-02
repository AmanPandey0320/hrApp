const express = require('express');
let ejs =require('ejs');
const e = require('express');
const { query } = require('express');
const app = express();
const path = require('path');
const port = 5560;

const nodemailer=require('nodemailer');
const fetch =require('node-fetch');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

const serviceAccount=require('./serviceAccountKey.json');
const { error } = require('jquery');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://app2pcon2k20.firebaseio.com"
});

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

//home route
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname,'./views/home.html'));
});



app.listen(port, () => console.log(`Example app listening on port ${port}`));