var express = require('express');
var _ = require('lodash')
var pg_connect = require('./pg_connect');
var router = express.Router();
var userInfoList = "user_id, username, email, mobile, dob, gender, address, pincode, sponsor_id, status"

router.get('/usersList', async function(req, res) {
    const curQuery = "select * from users"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)  
    }
});

router.post('/addUser', async function(req, res) {
    var curQuery = "insert into users(username, pwd, email, mobile, dob, gender, address, pincode, sponsor_id, status) values('"+req.body.username+"','"+req.body.pwd+"','"+req.body.email+"','"+req.body.mobile+"','"+req.body.dob+"','"+req.body.gender+"','"+req.body.address+"',"+req.body.pincode+","+req.body.sponsor_id+",'Inactive') returning user_id"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        var insQuery = "insert into payments(from_id, to_id, payment_level, payment_value, paid_status, receiver_type, receiver_confirm_date) values("+result[0].user_id+","+req.body.sponsor_id+",1,100,'Pending','Sponsor','"+pg_connect.getCurrentDate()+"')"
        var insResult = await pg_connect.connectDB(insQuery, res)
        if(insResult) {
            res.status(200).send({ message: 'data inserted successfully..'})
        }
    }
});

router.post('/userLogin', async function(req, res) {
    var curQuery = "select * from users where (username='"+req.body.username+"' or mobile='"+req.body.username+"') and pwd='"+req.body.pwd+"'"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        if(result.length === 0) {
            res.status(403).send({status: true, variant: 'error', message: 'Invalid username or password'})
        } else {
            var bnkQuery = "select * from user_bank_details where user_id="+result[0].user_id
            var bnkresult = await pg_connect.connectDB(bnkQuery, res)
            result[0]['bank_details'] = bnkresult[0]
            res.status(200).send(result[0])
        }
    }
});

router.post('/getUserDetails', async function(req, res) {
    var curQuery = "select "+userInfoList+" from users where user_id="+req.body.user_id
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        if(result.length === 0) {
            res.status(403).send({status: true, variant: 'error', message: 'Invalid Sponsor ID'})
        } else {
            var bnkQuery = "select * from user_bank_details where user_id="+req.body.user_id
            var bnkresult = await pg_connect.connectDB(bnkQuery, res)
            result[0]['bank_details'] = bnkresult[0]
            res.status(200).send(result[0])
        }
    }
});

async function getAuthInfoDetails (user_id, res) {
    var selQuery = "select * from users where user_id="+user_id
    var selResult = await pg_connect.connectDB(selQuery, res)
    if (selResult) {
        var bnkQuery = "select * from user_bank_details where user_id="+user_id
        var bnkresult = await pg_connect.connectDB(bnkQuery, res)
        selResult[0]['bank_details'] = bnkresult[0]
        res.status(200).send(selResult[0])
    }
}
router.post('/updateUserInfo', async function(req, res) {
    var curQuery = "update users set email='"+req.body.email+"', dob='"+req.body.dob+"', gender='"+req.body.gender+"', address='"+req.body.address+"', pincode='"+req.body.pincode+"' where user_id="+req.body.user_id
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        await getAuthInfoDetails(req.body.user_id, res)
    }
});

router.post('/updatePaymentInfo', async function(req, res) {
    var curQuery = ''
    if(req.body.mode === 'add') {
        curQuery = "insert into user_bank_details(user_id, bank_ac_name, bank_ac_number, bank_name, bank_branch, bank_ifsc_code, wallet_paytm_number, wallet_paytm_name, wallet_gp_number, wallet_gp_name, added_date) values("+req.body.user_id+", '"+req.body.bank_ac_name+"', '"+req.body.bank_ac_number+"', '"+req.body.bank_name+"', '"+req.body.bank_branch+"', '"+req.body.bank_ifsc_code+"', '"+req.body.wallet_paytm_number+"', '"+req.body.wallet_paytm_name+"', '"+req.body.wallet_gp_number+"', '"+req.body.wallet_gp_name+"', '"+pg_connect.getCurrentDate()+"')"
    } else {
        curQuery = "update user_bank_details set bank_ac_name='"+req.body.bank_ac_name+"', bank_ac_number='"+req.body.bank_ac_number+"', bank_name='"+req.body.bank_name+"', bank_branch='"+req.body.bank_branch+"', bank_ifsc_code='"+req.body.bank_ifsc_code+"', wallet_paytm_number='"+req.body.wallet_paytm_number+"', wallet_paytm_name='"+req.body.wallet_paytm_name+"', wallet_gp_number='"+req.body.wallet_gp_number+"', wallet_gp_name='"+req.body.wallet_gp_name+"' where user_id="+req.body.user_id
    }
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        await getAuthInfoDetails(req.body.user_id, res)
    }
});

router.post('/changePassword', async function(req, res) {
    var curQuery = "update users set pwd='"+req.body.pwd+"' where user_id="+req.body.user_id
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        await getAuthInfoDetails(req.body.user_id, res)
    }
});

router.post('/checkAvailability', async function(req, res) {
    curQuery = "select * from users where "+req.body.field_name+"='"+req.body.field_value+"'"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        if (result.length === 0)
            res.status(200).send({ field_name: req.body.field_name, availableStatus: false})
        else    
            res.status(200).send({ field_name: req.body.field_name, availableStatus: true})
    }
});

router.post('/getSmartSpreaders', async function(req, res) {
    curQuery = "select * from smart_spreaders t1 left join users t2 on t1.user_id = t2.user_id left join payments t3 on t1.payment_id = t3.payment_id where t1.payment_level="+req.body.payment_level+" order by t1.spreader_id"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)
    }
});

router.post('/myReferrals', async function(req, res) {
    curQuery = "select "+userInfoList+" from users where sponsor_id="+req.body.user_id
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        for(var i=0; i<result.length; i++) {
            var selQuery = "select * from payments where from_id="+result[i].user_id+" and confirm_status!='Cancelled' and payment_level=1"
            var selResult = await pg_connect.connectDB(selQuery, res)
            if (selResult) {
                result[i]['paymentInfo'] = selResult[0]
            }
        }
        res.status(200).send(result)
    }
});

router.post('/getMySmartSpreadersList', async function(req, res) {
    curQuery = "select * from smart_spreaders t1 left join users t2 on t1.user_id = t2.user_id left join payments t3 on t1.payment_id = t3.payment_id where t1.user_id="+req.body.user_id+" order by t1.spreader_id"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)
    }
});

module.exports = router
