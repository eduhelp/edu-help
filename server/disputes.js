var express = require('express');
var _ = require('lodash')
var path = require('path');
var pg_connect = require('./pg_connect');
var router = express.Router();
let multer = require('multer')
var userInfoList = "user_id, username, email, mobile, dob, gender, address, pincode, sponsor_id, status, fullname, country, state, city"

async function getSponsorName(sponsor_id, res) {
    if (sponsor_id > 0) {
        var sponsorQuery = "select username from users where user_id="+sponsor_id
        var sponsorResult = await pg_connect.connectDB(sponsorQuery, res)
        return sponsorResult[0].username
    } else {
        return 'root'
    }
}

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
        cb(null, ('/root/edu-help/screenshots/'))
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
            var userQuery = "select "+userInfoList+" from users where user_id="+result[i].dispute_to
            var userResult = await pg_connect.connectDB(userQuery, res)
            userResult[0]['sponsor_name'] = await getSponsorName(userResult[0].sponsor_id, res)
            var userFromQuery = "select "+userInfoList+" from users where user_id="+result[i].dispute_from
            var userfromResult = await pg_connect.connectDB(userFromQuery, res)
            userfromResult[0]['sponsor_name'] = await getSponsorName(userfromResult[0].sponsor_id, res)
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

 router.post('/cancelTransaction', async function(req, res) {
    var curQuery = "update payments set confirm_status='Cancelled', confirm_date='"+pg_connect.getCurrentDate()+"' where payment_id="+req.body.payment_id
    var result = await pg_connect.connectDB(curQuery, res)
    if (req.body.dispute_id) {
        var disQuery = "update disputes set dispute_status='Closed', reply_message='payment cancelled by admin', replied_date='"+pg_connect.getCurrentDate()+"' where dispute_id="+req.body.dispute_id
        var disResult = await pg_connect.connectDB(disQuery, res)
    }
    if(req.body.receiver_type == 'SmartSpreader') {
        var smQuery = "update smart_spreaders set current_status='Active', payment_id=null where user_id="+req.body.receiver_id+" and current_status='InProgress' and payment_level="+req.body.payment_level
        var smResult = await pg_connect.connectDB(smQuery, res)
    }
    res.status(200).send({message: 'transaction cancelled'})
});
 

router.post('/addNotification', async function(req, res) {
    var curQuery = "insert into notifications(notify_title, notify_msg, notify_date) values('"+req.body.title+"','"+req.body.message+"','"+pg_connect.getCurrentDate()+"')"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)
    }
});

router.post('/getNotifications', async function(req, res) {
    var curQuery = "select * from notifications order by notify_date desc"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)
    }
});

router.post('/getPendingList', async function(req, res) {
    var sendData = {
        giveHelp: '',
        receiveHelp: '',
        smartSpreader: ''
    }
    // Give Help pending
    var Query1 = "select * from payments where from_id="+req.body.user_id+" and confirm_status!='Confirmed'"
    var givePending = await pg_connect.connectDB(Query1, res)
    if(givePending) {
        for(var i=0; i<givePending.length; i++) {
            givePending[i]['disp_name'] = await getSponsorName(givePending[i].to_id, res)
        }
        sendData.giveHelp = givePending
    }
    // Receive Help pending
    var Query2 = "select * from payments where to_id="+req.body.user_id+" and confirm_status!='Confirmed'"
    var receivePending = await pg_connect.connectDB(Query2, res)
    if(receivePending) {
        for(var i=0; i<receivePending.length; i++) {
            receivePending[i]['disp_name'] = await getSponsorName(receivePending[i].from_id, res)
        }
        sendData.receiveHelp = receivePending
    }
    // Smart Spreader pending
    var Query3 = "select * from smart_spreaders t1 left join payments t2 on t1.payment_id = t2.payment_id  where t1.user_id="+req.body.user_id+" and t1.current_status='InProgress'"
    // var Query3 = "select * from smart_spreaders where user_id="+req.body.user_id+" and current_status='InProgress'"
    var smartPending = await pg_connect.connectDB(Query3, res)
    if(smartPending) {
        sendData.smartSpreader = smartPending
    }
    res.status(200).send(sendData)
});

module.exports = router
