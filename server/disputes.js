var express = require('express');
var _ = require('lodash')
var path = require('path');
var pg_connect = require('./pg_connect');
var router = express.Router();
var userInfoList = "user_id, username, email, mobile, dob, gender, address, pincode, sponsor_id, status"

router.post('/open', async function(req, res) {
    var curQuery = "insert into disputes(dispute_from, dispute_to, dispute_type, payment_id, message, dispute_status, added_date) values("+req.body.dispute_from+","+req.body.dispute_to+",'"+req.body.dispute_type+"',"+req.body.payment_id+",'"+req.body.message+"','Open','"+pg_connect.getCurrentDate()+"') returning dispute_id"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        console.log('req.body.fileInfo')
        console.log(req.body.fileInfo)
        await uploadFileToFolder(req.body.fileInfo, res)
        var insQuery = "insert into dispute_files(file_name, file_path, dispute_id, status, added_by, added_date) values('FNAME','FPATH',"+result[0].dispute_id+",'Active',"+req.body.dispute_from+",'"+pg_connect.getCurrentDate()+"')"
        var insResult = await pg_connect.connectDB(insQuery, res)
        if(insResult) {
            res.status(200).send({ message: 'data inserted successfully..'})
        }
    }
});

async function uploadFileToFolder(fileData, res) {
    console.log(fileData)
    console.log(__dirname)
   /* let imageFile = fileData.file;

  imageFile.mv(path.join(__dirname+"./../src/dispute_files"), function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    //res.json({file: `public/${fileData.fileName}.jpg`});
  }); */
}
module.exports = router
