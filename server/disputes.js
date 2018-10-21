var express = require('express');
var _ = require('lodash')
var path = require('path');
var pg_connect = require('./pg_connect');
var router = express.Router();
let multer = require('multer')
var userInfoList = "user_id, username, email, mobile, dob, gender, address, pincode, sponsor_id, status"

router.post('/open', async function(req, res) {
    var curQuery = "insert into disputes(dispute_from, dispute_to, dispute_type, payment_id, message, dispute_status, added_date) values("+req.body.dispute_from+","+req.body.dispute_to+",'"+req.body.dispute_type+"',"+req.body.payment_id+",'"+req.body.message+"','Open','"+pg_connect.getCurrentDate()+"') returning dispute_id"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        await uploadFileToFolder(req.body.fileInfo, result[0].dispute_id, req.body.dispute_from, res)
        res.status(200).send({ message: 'data inserted successfully..'})
    }
});

async function uploadFileToFolder(fileData, dispute_id, dispute_from, res) {
    for(var i=0; i<fileData.length; i++){
        var insQuery = "insert into dispute_files(file_name, file_path, dispute_id, status, added_by, added_date) values('"+fileData[i]+"','/screenshots/',"+dispute_id+",'Active',"+dispute_from+",'"+pg_connect.getCurrentDate()+"')"
        var insResult = await pg_connect.connectDB(insQuery, res)
    }
}

router.post('/screenshotUpload', async function(req, res) {
    let storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, ('screenshots/'))
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.jpeg')
      },
    })
  
    // let upload = multer({ dest: ('hidden/images/slip/' + req.body.classId) }).single('file')
    let upload = multer({ storage: storage }).single('file')
    upload(req, res, function (err) {
      if (err) {
        console.log(err, res)
      }
      res.json({'status': 'completed', 'path': res.req.file.filename})
    })
  })

  async function getDisputes(query, res) {
    var result = await pg_connect.connectDB(query, res)
    if(result) {
        for(var i=0; i<result.length; i++) {
            var selQuery = "select * from payments where payment_id="+result[i].payment_id
            var selResult = await pg_connect.connectDB(selQuery, res)
            var userQuery = "select * from users where user_id="+result[i].dispute_to
            var userResult = await pg_connect.connectDB(userQuery, res)
            var userFromQuery = "select * from users where user_id="+result[i].dispute_from
            var userfromResult = await pg_connect.connectDB(userFromQuery, res)
            result[i]['paymentInfo'] = selResult[0]
            result[i]['disputeToUserInfo'] = userResult[0]
            result[i]['disputeFromUserInfo'] = userfromResult[0]
        }
        res.status(200).send(result)
    }
  }

  router.post('/getMyDisputes', async function(req, res) {
    var curQuery = "select * from disputes where dispute_from="+req.body.user_id+" or dispute_to="+req.body.user_id
    await getDisputes(curQuery, res)
 });
  
 router.post('/getDisputePhotos', async function(req, res) {
    var curQuery = "select * from dispute_files where dispute_id="+req.body.dispute_id
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)
    }
});

router.post('/addScreenshot', async function(req, res) {
    await uploadFileToFolder(req.body.fileInfo, req.body.dispute_id, req.body.dispute_from, res)
    res.status(200).send({message: 'screenshot added'})
});

router.post('/addDisputeComment', async function(req, res) {
    var curQuery = "insert into dispute_comments(dispute_id, added_by, message, added_date) values("+req.body.dispute_id+","+req.body.added_by+",'"+req.body.message+"','"+pg_connect.getCurrentDate()+"')"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)
    }
});

router.post('/getDisputeComments', async function(req, res) {
    var curQuery = "select * from dispute_comments where dispute_id="+req.body.dispute_id
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)
    }
});

router.post('/getAllDisputes', async function(req, res) {
    var curQuery = "select * from disputes"
    await getDisputes(curQuery, res)
 });


module.exports = router
