var express = require('express');
var _ = require('lodash')
var pg_connect = require('./pg_connect');
var router = express.Router();
var userInfoList = "user_id, username, email, mobile, dob, gender, address, pincode, sponsor_id, status, fullname, country, state, city"

router.post('/usersList', async function(req, res) {
    const curQuery = "select * from users"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)  
    }
});

router.post('/changeUserStatus', async function(req, res) {
    const upQuery = "update users set status='"+req.body.new_status+"' where user_id="+req.body.user_id
    var upResult = await pg_connect.connectDB(upQuery, res)
    if (upResult) {
        const curQuery = "select * from users"
        var result = await pg_connect.connectDB(curQuery, res)
        if(result) {
            res.status(200).send(result)  
        }
    }
    
});


router.post('/addUser', async function(req, res) {
    var curQuery = "insert into users(username, pwd, email, mobile, dob, gender, address, pincode, sponsor_id, status, fullname, country, state, city) values('"+req.body.username+"','"+req.body.pwd+"','"+req.body.email+"','"+req.body.mobile+"','"+req.body.dob+"','"+req.body.gender+"','"+req.body.address+"',"+req.body.pincode+","+req.body.sponsor_id+",'Inactive','"+req.body.fullname+"','"+req.body.country+"','"+req.body.state+"','"+req.body.city+"') returning user_id"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        var insQuery = "insert into payments(from_id, to_id, payment_level, payment_value, paid_status, receiver_type, receiver_confirm_date, confirm_status) values("+result[0].user_id+","+req.body.sponsor_id+",1,100,'Pending','Sponsor','"+pg_connect.getCurrentDate()+"', 'Initiated')"
        var insResult = await pg_connect.connectDB(insQuery, res)
        if(insResult) {
            res.status(200).send({ message: 'data inserted successfully..'})
        }
    }
});

async function getSponsorName(sponsor_id, res) {
    if (sponsor_id > 0) {
        var sponsorQuery = "select username from users where user_id="+sponsor_id
        var sponsorResult = await pg_connect.connectDB(sponsorQuery, res)
        return sponsorResult[0].username
    } else {
        return 'root'
    }
}

async function getBankDetails(user_id, res) {
    var bnkQuery = "select * from user_bank_details where user_id="+user_id
    var bnkresult = await pg_connect.connectDB(bnkQuery, res)
    return bnkresult[0]
}

router.post('/userLogin', async function(req, res) {
    var curQuery = "select "+userInfoList+" from users where (username='"+req.body.username+"' or mobile='"+req.body.username+"') and pwd='"+req.body.pwd+"'"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        if(result.length === 0) {
            res.status(403).send({status: true, variant: 'error', message: 'Invalid username or password'})
        } else {
            result[0]['bank_details'] = await getBankDetails(result[0].user_id, res)
            result[0]['sponsor_name'] = await getSponsorName(result[0].sponsor_id, res)
            result[0]['receive_level_status'] = await getLevelStatus('to_id', result[0].user_id, res)
            result[0]['give_level_status'] = await getLevelStatus('from_id', result[0].user_id, res)
            res.status(200).send(result[0])
        }
    }
});

router.post('/getUserDetails', async function(req, res) {
    var curQuery = ''
    if (req.body.user_id) {
        curQuery = "select "+userInfoList+" from users where user_id="+req.body.user_id
    } else if (req.body.username) {
        curQuery = "select "+userInfoList+" from users where username='"+req.body.username+"'"
    } else {
        res.status(403).send({status: true, variant: 'error', message: 'Invalid Request Parameter'})
    }
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        if(result.length === 0) {
            res.status(403).send({status: true, variant: 'error', message: 'Invalid Sponsor ID'})
        } else {
            result[0]['bank_details'] = await getBankDetails(result[0].user_id, res)
            result[0]['sponsor_name'] = await getSponsorName(result[0].sponsor_id, res)
            res.status(200).send(result[0])
        }
    }
});

async function getLevelStatus(status_for,user_id, res) {
    var levQuery = "select max(payment_level) from payments where confirm_status='Confirmed' and "+status_for+"="+user_id
    var levResult = await pg_connect.connectDB(levQuery, res)
    if(levResult[0].max !== null) {
        return 'Level '+levResult[0].max
    } else {
        return 'Level 0'
    }
}

async function getAuthInfoDetails (user_id, res) {
    var selQuery = "select "+userInfoList+" from users where user_id="+user_id
    var selResult = await pg_connect.connectDB(selQuery, res)
    if (selResult) {
        selResult[0]['bank_details'] = await getBankDetails(selResult[0].user_id, res)
        selResult[0]['sponsor_name'] = await getSponsorName(selResult[0].sponsor_id, res)
        selResult[0]['receive_level_status'] = await getLevelStatus('to_id', selResult[0].user_id, res)
        selResult[0]['give_level_status'] = await getLevelStatus('from_id', selResult[0].user_id, res)
        res.status(200).send(selResult[0])
    }
}

router.post('/updateUserInfo', async function(req, res) {
    var curQuery = "update users set fullname='"+req.body.fullname+"', email='"+req.body.email+"',mobile='"+req.body.mobile+"', dob='"+req.body.dob+"', gender='"+req.body.gender+"', country='"+req.body.country+"', city='"+req.body.city+"', state='"+req.body.state+"', address='"+req.body.address+"', pincode='"+req.body.pincode+"' where user_id="+req.body.user_id
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        await getAuthInfoDetails(req.body.user_id, res)
    }
});

router.post('/updatePaymentInfo', async function(req, res) {
    var curQuery = ''
    if(req.body.mode === 'add') {
        curQuery = "insert into user_bank_details(user_id, bank_ac_name, bank_ac_number, bank_name, bank_branch, bank_ifsc_code, wallet_paytm_number, wallet_paytm_name, wallet_gp_number, wallet_gp_name, added_date, account_type) values("+req.body.user_id+", '"+req.body.bank_ac_name+"', '"+req.body.bank_ac_number+"', '"+req.body.bank_name+"', '"+req.body.bank_branch+"', '"+req.body.bank_ifsc_code+"', '"+req.body.wallet_paytm_number+"', '"+req.body.wallet_paytm_name+"', '"+req.body.wallet_gp_number+"', '"+req.body.wallet_gp_name+"', '"+pg_connect.getCurrentDate()+"', '"+req.body.account_type+"')"
    } else {
        curQuery = "update user_bank_details set bank_ac_name='"+req.body.bank_ac_name+"', bank_ac_number='"+req.body.bank_ac_number+"', bank_name='"+req.body.bank_name+"', bank_branch='"+req.body.bank_branch+"', bank_ifsc_code='"+req.body.bank_ifsc_code+"', wallet_paytm_number='"+req.body.wallet_paytm_number+"', wallet_paytm_name='"+req.body.wallet_paytm_name+"', wallet_gp_number='"+req.body.wallet_gp_number+"', wallet_gp_name='"+req.body.wallet_gp_name+"', account_type='"+req.body.account_type+"' where user_id="+req.body.user_id
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
            result[i]['sponsor_name'] = await getSponsorName(result[i].sponsor_id, res)
            var selQuery = "select * from payments where from_id="+result[i].user_id+" and confirm_status!='Cancelled' and payment_level=1"
            var selResult = await pg_connect.connectDB(selQuery, res)
            selResult[0]['giver_name'] = await getSponsorName(selResult[0].from_id, res)
            selResult[0]['receiver_name'] = await getSponsorName(selResult[0].to_id, res)
            if (selResult) {
                result[i]['paymentInfo'] = selResult[0]
            }
        }
        res.status(200).send(result)
    }
});

router.post('/getMySmartSpreadersList', async function(req, res) {
    // curQuery = "select * from smart_spreaders t1 left join users t2 on t1.user_id = t2.user_id left join payments t3 on t1.payment_id = t3.payment_id where t1.user_id="+req.body.user_id+" order by t1.spreader_id"
    curQuery = "select * from smart_spreaders where user_id="+req.body.user_id+" order by spreader_id"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        for(var i=0; i<result.length; i++) {
            if(result[i].current_status !== 'Active') {
                var selQuery = "select * from payments where payment_id="+result[i].payment_id
                var selResult = await pg_connect.connectDB(selQuery, res)
                if(selResult.length >= 1) {
                    result[i]['paymentInfo'] = selResult[0]
                    result[i]['paymentInfo']['giver_name'] = await getSponsorName(selResult[0].from_id, res)
                    result[i]['paymentInfo']['receiver_name'] = await getSponsorName(selResult[0].to_id, res)
                    curQuery = "select "+userInfoList+" from users where user_id="+selResult[0].from_id
                    var userResult = await pg_connect.connectDB(curQuery, res)
                    if (userResult) {
                        result[i]['giverInfo'] = userResult[0]
                        result[i]['giverInfo']['sponsor_name'] = await getSponsorName(userResult[0].sponsor_id, res)
                    }
                }
            }
        }
        res.status(200).send(result)
    }
});

async function maintenanceStatus (res) {
    var adminQuery = "select * from admin where admin_id=1"
    var adminRes = await pg_connect.connectDB(adminQuery, res)
    return adminRes[0]
    
}
router.post('/getMaintenanceStatus', async function(req, res) {
    var adminRes = await maintenanceStatus() 
    if(adminRes) {
        res.status(200).send(adminRes)
    }
});

router.post('/updateMaintenance', async function(req, res) {
    var adminQuery = "update admin set status='"+req.body.status+"', message='"+req.body.message+"', title='"+req.body.title+"' where admin_id=1"
    var adminUpRes = await pg_connect.connectDB(adminQuery, res)
    var adminRes = await maintenanceStatus() 
    if(adminRes) {
        res.status(200).send(adminRes)
    }
});



module.exports = router
