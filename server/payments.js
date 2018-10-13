var express = require('express');
var _ = require('lodash')
var pg_connect = require('./pg_connect');
var router = express.Router();
var userInfoList = "user_id, username, email, mobile, dob, gender, address, pincode, sponsor_id, status"

router.post('/levelPayments', async function(req, res) {
    var curQuery = "select * from level_payments"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)
    }
});

router.post('/paymentDetails', async function(req, res) {
    var curQuery = "select * from payments where from_id="+req.body.user_id+" or to_id="+req.body.user_id
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)
    }
});

router.post('/makeLevelPayment', async function(req, res) {
    var updQuery = "update payments set paid_status='Completed', payment_mode='"+req.body.payment_mode+"', from_bank='"+req.body.from_bank+"', to_bank='"+req.body.to_bank+"', transaction_id='"+req.body.transaction_id+"', transaction_date='"+req.body.transaction_date+"', paid_date='"+pg_connect.getCurrentDate()+"', confirm_status='Pending' where payment_id="+req.body.payment_id
    var result = await pg_connect.connectDB(updQuery, res)
    if(result) {
        res.status(200).send({message: 'payment details successfully updated'})
    }
});

router.post('/receivePaymentList', async function(req, res) {
    var curQuery = "select * from payments where payment_level="+req.body.payment_level+" and to_id="+req.body.user_id+" and confirm_status='Pending'"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        for(var i=0; i<result.length; i++) {
            var selQuery = "select "+userInfoList+" from users where user_id="+result[i].from_id
            var selResult = await pg_connect.connectDB(selQuery, res)
            if (selResult) {
                result[i]['giverInfo'] = selResult[0]
            }
        }
        res.status(200).send(result)
    }
});

router.post('/confirmLevelPayment', async function(req, res) {
    var updateQuery = "update payments set confirm_status='Confirmed', confirm_date='"+pg_connect.getCurrentDate()+"' where payment_id="+req.body.payment_id
    var updateRes = await pg_connect.connectDB(updateQuery, res)
    if(updateRes) {
        if(req.body.receiver_type === "SmartSpreader") {
            var updQuery = "update smart_spreaders set current_status='Completed', completed_date='"+pg_connect.getCurrentDate()+"', payment_id="+req.body.payment_id+" where user_id="+req.body.to_id+" and current_status='InProgress' and payment_level="+req.body.payment_level
            var updRes = await pg_connect.connectDB(updQuery, res)
            var insQuery = "insert into smart_spreaders(user_id, added_date, current_status, payment_level) values("+req.body.to_id+",'"+pg_connect.getCurrentDate()+"','Active',"+req.body.payment_level+")"
            var insRes = await pg_connect.connectDB(insQuery, res)
        }
        if(req.body.payment_level === "1") {
            var retArr = []
            var curLevel = 0
            var nodeObj = {
                level: curLevel,
                node: req.body.sponsor_id
            }
            retArr.push(nodeObj)
            var resultArray = await getRootArray(req.body.sponsor_id, retArr, curLevel, res)
            var insResult = await insertToPosition(req.body.user_id, resultArray, res)
            var updResult = await updateUser(req.body.user_id, res)
            var entResult = await entryToSmartSpreaderBucket(req.body.user_id, req.body.payment_level, res)
            if(entResult) {
                res.status(200).send({message: 'Confirmaton status successfully updated for level-'+req.body.payment_level})
            }
        } else {
            res.status(200).send({message: 'Confirmaton status successfully updated for level-'+req.body.payment_level})
        }
        var usersCountQuery = "select count(*) from users where sponsor_id="+req.body.user_id+" and status='Active'"
        var usersCountResult = await pg_connect.connectDB(usersCountQuery, res)
        if(usersCountResult[0].count >= 6) {
            await placementToSmartSpreaderBucket(req.body.user_id, req.body.payment_level, res)
        }
    }
});

async function getRootArray(sp_id, retArr, getLevel, res) {
    var curQuery = "select * from positions where parent_id="+sp_id
    var curResult = await pg_connect.connectDB(curQuery, res)
    var curLevel = getLevel + 1
    for(var i=0; i<curResult.length; i++) {
        var nodeObj = {
            level: curLevel,
            node: curResult[i].user_id
        }
        retArr.push(nodeObj)
    }
    for(var i=0; i<curResult.length; i++) {
        await getRootArray(curResult[i].user_id, retArr, curLevel, res)
    }
    return retArr
}

async function insertToPosition(user_id, resArr, res) {
    const maxObj = _.maxBy(resArr, function(o) { return o.level })
    outerLoop: for(var i=0; i<=maxObj.level; i++) {
        const filteredData = _.filter(resArr, function(obj) { return obj.level==i })
        innerLoop: for(var j=0; j<filteredData.length; j++) {
            var countQuery = "select count(*) from positions where parent_id="+filteredData[j].node
            var curRes = await pg_connect.connectDB(countQuery, res)
            if(curRes[0].count <= 1) {
                var positions = (curRes[0].count == 0) ? 'L' : (curRes[0].count == 1) ? 'R' : 1
                var insQuery = "insert into positions(user_id, parent_id, placement) values("+user_id+","+filteredData[j].node+",'"+positions+"')"
                var insRes = await pg_connect.connectDB(insQuery, res)
                break outerLoop;
            }
        }
    }
}

async function updateUser(user_id, res) {
    var curQuery = "update users set status='Active' where user_id="+user_id
    var result = await pg_connect.connectDB(curQuery, res)
    return result
}

async function entryToSmartSpreaderBucket(user_id, payment_level, res) {
    // get count of users which i spoonsored
    var usersCountQuery = "select count(*) from users where sponsor_id="+user_id+" and status='Active'"
    var usersCountResult = await pg_connect.connectDB(usersCountQuery, res)
    if(usersCountResult[0].count >= 6) {
        //checkLevelEligibility
        for(var i=2; i<=7; i++) {
            var findRootLevelId = await getMyParentLevelWise(user_id, i, res)
            var eligibility = ''
            if (findRootLevelId) {
                var eliQuery = "select * from payments where from_id="+user_id+" and payment_level='"+i+"'"
                var eliResult = await pg_connect.connectDB(eliQuery, res)
                if(eliResult) {
                    if(eliResult.length === 0) {
                        eligibility = false
                    } else {
                        eligibility = true
                    }
                }
            } else {
                eligibility = true
            }
            if(eligibility) {
                await placementToSmartSpreaderBucket(user_id, i, res)
            }
        }
    }
}

async function placementToSmartSpreaderBucket(user_id, payment_level, res) {
    // check im into smart spreader bucket or not
    var ssQuery = "select count(*) from smart_spreaders where user_id="+user_id+" and payment_level="+payment_level
    var ssResult = await pg_connect.connectDB(ssQuery, res)
    if(ssResult[0].count == 0) {
        // insert to smart spreader table for level i
        var insQuery = "insert into smart_spreaders(user_id, added_date, current_status, payment_level) values("+user_id+",'"+pg_connect.getCurrentDate()+"','Active',"+payment_level+")"
        var insRes = await pg_connect.connectDB(insQuery, res)
    }
}

async function getMyParentLevelWise(user_id, maxLevel, res) {
    var haveRootLevel = true
    var cur_user_id = user_id
    outerLoop: for(var i=1; i<=maxLevel; i++) {
        var curQuery = "select * from positions where user_id="+cur_user_id
        var curResult = await pg_connect.connectDB(curQuery, res)
        if (curResult) {
            if (curResult[0].parent_id === '0' && i<=maxLevel) {
                haveRootLevel = false
                break outerLoop;
            } else {
                cur_user_id = curResult[0].parent_id
            }
        }
    }
    return haveRootLevel
}

async function getPaymentList(query, res) {
    var result = await pg_connect.connectDB(query, res)
    if(result) {
        for(var i=0; i<result.length; i++) {
            var selQuery = "select "+userInfoList+" from users where user_id="+result[i].to_id
            var selResult = await pg_connect.connectDB(selQuery, res)
            if (selResult) {
                result[i]['receiverInfo'] = selResult[0]
                var bnkQuery = "select * from user_bank_details where user_id="+result[i].to_id
                var bnkresult = await pg_connect.connectDB(bnkQuery, res)
                result[i]['receiverInfo']['bank_details'] = bnkresult[0]
            }
        }
        res.status(200).send(result)
    }
}

router.post('/myPaymentList', async function(req, res) {
    var curQuery = "select * from payments where from_id="+req.body.user_id
    await getPaymentList(curQuery, res)
});

router.post('/receivedPaymentList', async function(req, res) {
    var curQuery = "select * from payments where to_id="+req.body.user_id
    await getPaymentList(curQuery, res)
});

router.post('/levelEligibility', async function(req, res) {
    var curQuery = "select * from payments where from_id="+req.body.user_id+" and payment_level='"+req.body.payment_level+"'"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        if(result.length === 0) {
            res.status(200).send({ eligibility: false })
        } else {
            res.status(200).send({ eligibility: true })
        }
    }
});

router.post('/addConfirmReceiver', async function(req, res) {
    var insQuery = "insert into payments(from_id, to_id, payment_level, payment_value, paid_status, receiver_type, receiver_confirm_date) values("+req.body.from_id+","+req.body.to_id+","+req.body.payment_level+","+req.body.payment_value+",'Pending','"+req.body.receiver_type+"','"+pg_connect.getCurrentDate()+"')"
    if(req.body.receiver_type == 'RootParent') {
        var result = await pg_connect.connectDB(insQuery, res)
        if(result) {
            res.status(200).send({message: 'receiver confirmed from root parent'})
        }
    } else if(req.body.receiver_type == 'SmartSpreader') {
        var curQuery = "select * from smart_spreaders t1 left join users t2 on t1.user_id = t2.user_id  where t1.current_status='Active' and t1.payment_level="+req.body.payment_level+" order by t1.spreader_id limit 1"
        var result = await pg_connect.connectDB(curQuery, res)
        if(result) {
            if(result[0].user_id == req.body.to_id) {
                var updQuery = "update smart_spreaders set current_status='InProgress' where spreader_id="+result[0].spreader_id
                var updResult = await pg_connect.connectDB(updQuery, res)
                if(updResult) {
                    var result = await pg_connect.connectDB(insQuery, res)
                    if(result) {
                        res.status(200).send({message: 'receiver confirmed from smart spreader'})
                    }
                }
            } else {
                res.status(403).send({message: 'selected smart spreader already engaged, please select another smart spreader'})
            }
        }
    }
});
module.exports = router