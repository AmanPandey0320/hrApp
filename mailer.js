const nodemailer=require('nodemailer');
//email transporter
module.exports = nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'darkphoenix09199@gmail.com',
      pass:'Aman@4457',
    }
  });
