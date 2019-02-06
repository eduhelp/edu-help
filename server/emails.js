var express = require('express');
var nodemailer = require('nodemailer');
var pg_connect = require('./pg_connect');
var router = express.Router();



/* var transporter = nodemailer.createTransport({
    service: 'http://103.235.105.52/',
    auth: {
      user: 'info@eduhelp.live',
      pass: 'EduHelp@Live'
    }
  }); */

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    auth: {
      user: '247eduhelp@gmail.com',
      pass: 'HelpEdu247'
    }
  }); 

router.post('/sendForgotPassword', async function(req, res) {
    var Query2 = "select * from users where email='"+req.body.email+"'"
    var userInfo = await pg_connect.connectDB(Query2, res)
    if(userInfo) {
      var msgContent = 'Hi '+userInfo[0].username+",\n\n Please find your details below, \n Username: "+userInfo[0].username+"\n Password : "+userInfo[0].pwd+"\n\n - Team Eduhelp"
      var mailOptions = {
          from: 'info@eduhelp.live',
          to: req.body.email,
          subject: 'Eduhelp - Forgot Password',
          text: msgContent
        };
        
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(200).send({ mail : 'not'});
        } else {
          res.status(200).send({ mail : 'teset'});
        }
      });
    }
});

router.post('/emailNotification', async function(req, res) {
    var mailOptions = {
        from: 'info@eduhelp.live',
        to: req.body.email,
        subject: req.body.title,
        text: req.body.message
      };
      
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.status(200).send({ mail : 'not'});
        console.log(error);
      } else {
        res.status(200).send({ mail : 'teset'});
        console.log('Email sent: ' + info.response);
      }
    });
});


module.exports = router