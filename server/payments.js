var express = require('express');
var _ = require('lodash')
var pg_connect = require('./pg_connect');
var router = express.Router();
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

async function getBankDetails(user_id, res) {
    var bnkQuery = "select * from user_bank_details where user_id="+user_id
    var bnkresult = await pg_connect.connectDB(bnkQuery, res)
    return bnkresult[0]
}

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
        for(var i=0; i<result.length; i++) {
            result[i]['giver_name'] = await getSponsorName(result[i].from_id, res)
            result[i]['receiver_name'] = await getSponsorName(result[i].to_id, res)
        }
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

router.post('/myConfirmPendingList', async function(req, res) {
    var curQuery = "select * from payments where payment_level="+req.body.payment_level+" and to_id="+req.body.user_id+" and confirm_status='Pending'"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        for(var i=0; i<result.length; i++) {
            result[i]['giver_name'] = await getSponsorName(result[i].from_id, res)
            result[i]['receiver_name'] = await getSponsorName(result[i].to_id, res)
            var selQuery = "select "+userInfoList+" from users where user_id="+result[i].from_id
            var selResult = await pg_connect.connectDB(selQuery, res)
            if (selResult) {
                result[i]['giverInfo'] = selResult[0]
                result[i]['giverInfo']['sponsor_name'] = await getSponsorName(selResult[0].sponsor_id, res)
            }
        }
        res.status(200).send(result)
    }
});

router.post('/confirmLevelPayment', async function(req, res) {
    var checkQuery = "select * from payments where payment_id="+req.body.payment_id
    var checkRes = await pg_connect.connectDB(checkQuery, res)
    if(checkRes) {
        if(checkRes[0].confirm_status == 'Pending') {
            var updateQuery = "update payments set confirm_status='Confirmed', confirm_date='"+pg_connect.getCurrentDate()+"', confirmed_by='"+req.body.confirmed_by+"' where payment_id="+req.body.payment_id
            var updateRes = await pg_connect.connectDB(updateQuery, res)
            if(updateRes) {
                if(req.body.receiver_type == "SmartSpreader") {
                    var updQuery = "update smart_spreaders set current_status='Completed', completed_date='"+pg_connect.getCurrentDate()+"', payment_id="+req.body.payment_id+" where user_id="+req.body.to_id+" and current_status='InProgress' and payment_level="+req.body.payment_level
                    var updRes = await pg_connect.connectDB(updQuery, res)
                    // select smart spreader count level wise and check if it is reached 10 or not
                    var countSSQuery = "select count(*) from smart_spreaders where current_status='Completed' and user_id="+req.body.to_id+" and payment_level="+req.body.payment_level
                    var countSSRes = await pg_connect.connectDB(countSSQuery, res)
                    if(countSSRes[0].count < 10) {
                        var insQuery = "insert into smart_spreaders(user_id, added_date, current_status, payment_level) values("+req.body.to_id+",'"+pg_connect.getCurrentDate()+"','Active',"+req.body.payment_level+")"
                        var insRes = await pg_connect.connectDB(insQuery, res)
                    }
                }
                if(req.body.payment_level == "1") {
                    var retArr = []
                    var curLevel = 0
                    var nodeObj = {
                        level: curLevel,
                        node: req.body.sponsor_id
                    }
                    retArr.push(nodeObj)
                    var resultArray = await getRootArray(req.body.sponsor_id, retArr, curLevel, res)
                    var insResult = await insertToPosition(req.body.user_id, resultArray, res)
                    // var updResult = await updateUser(req.body.user_id, res)
                    await checkDisputes(req.body.payment_id, res)
                    var entResult = await entryToSmartSpreaderBucket(req.body.sponsor_id, req.body.payment_level, res)
                    if(entResult) {
                        res.status(200).send({message: 'Confirmaton status successfully updated for level-'+req.body.payment_level})
                    }
                } else {
                    if (req.body.payment_level == "3" || req.body.payment_level == "2") {
                        var myActiveStatus = await getMyActiveStatus(req.body.user_id, res)
                        if (myActiveStatus) {
                            var updResult = await updateUser(req.body.user_id, res)
                        }
                    }
                    await checkDisputes(req.body.payment_id, res)
                    var entResult = await entryToSmartSpreaderBucket(req.body.user_id, req.body.payment_level, res)
                    if(entResult) {
                        res.status(200).send({message: 'Confirmaton status successfully updated for level-'+req.body.payment_level})
                    }
                }
            }
        } else {
            res.status(403).send({message:'payment already processed on level'+req.body.payment_level})
        }
    } else {
        res.status(403).send({message:'payment already processed on level'+req.body.payment_level})
    }
});

async function getMyActiveStatus(user_id, res) {
    var checkQuery = "select * from payments where from_id ="+user_id+" and payment_level <=3 and confirm_status='Confirmed'"
    var checkResult = await pg_connect.connectDB(checkQuery, res)
    if(checkResult.length === 3) {
        return true
    }
    return false
}

async function checkDisputes(payment_id, res) {
    var curQuery = "select * from disputes where dispute_status='Open' and payment_id="+payment_id
    var curResult = await pg_connect.connectDB(curQuery, res)
    if(curResult.length >= 1) {
        var disQuery = "update disputes set dispute_status='Closed', reply_message='payment confirmed by receiver', replied_date='"+pg_connect.getCurrentDate()+"' where dispute_id="+curResult[0].dispute_id
        var disResult = await pg_connect.connectDB(disQuery, res)
    }
}
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
                var eliQuery = "select * from payments where from_id="+user_id+" and confirm_status!='Cancelled' and payment_level='"+i+"'"
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
            if (curResult[0].parent_id == '0' && i<=maxLevel) {
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
            result[i]['giver_name'] = await getSponsorName(result[i].from_id, res)
            result[i]['receiver_name'] = await getSponsorName(result[i].to_id, res)
            var selQuery = "select "+userInfoList+" from users where user_id="+result[i].to_id
            var selResult = await pg_connect.connectDB(selQuery, res)
            if (selResult) {
                result[i]['receiverInfo'] = selResult[0]
                result[i]['receiverInfo']['sponsor_name'] = await getSponsorName(selResult[0].sponsor_id, res)
                result[i]['receiverInfo']['bank_details'] = await getBankDetails(selResult[0].user_id, res)
            }
        }
        res.status(200).send(result)
    }
}

router.post('/myPaymentList', async function(req, res) {
    var curQuery = "select * from payments where from_id="+req.body.user_id+" and confirm_status!='Cancelled'"
    await getPaymentList(curQuery, res)
});

router.post('/myReceivedPaymentList', async function(req, res) {
    var curQuery = "select * from payments where to_id="+req.body.user_id+" and confirm_status!='Cancelled'"
    await getPaymentList(curQuery, res)
});

router.post('/levelEligibility', async function(req, res) {
    var curQuery = "select * from payments where from_id="+req.body.user_id+" and confirm_status!='Cancelled' and payment_level='"+req.body.payment_level+"'"
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
    var checkQuery = "select count(*) from payments where from_id="+req.body.from_id+" and to_id="+req.body.to_id+" and payment_level="+req.body.payment_level
    var checkResult = await pg_connect.connectDB(checkQuery, res)
    if(checkResult[0].count == 0) {
        var insQuery = "insert into payments(from_id, to_id, payment_level, payment_value, paid_status, receiver_type, receiver_confirm_date, confirm_status) values("+req.body.from_id+","+req.body.to_id+","+req.body.payment_level+","+req.body.payment_value+",'Pending','"+req.body.receiver_type+"','"+pg_connect.getCurrentDate()+"', 'Initiated') returning payment_id"
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
                    var insResult = await pg_connect.connectDB(insQuery, res)
                    if(insResult) {
                        var updQuery = "update smart_spreaders set current_status='InProgress', payment_id="+insResult[0].payment_id+" where spreader_id="+result[0].spreader_id
                        var updResult = await pg_connect.connectDB(updQuery, res)
                        if(updResult) {
                            res.status(200).send({message: 'receiver confirmed from smart spreader'})
                        }
                    }
                } else {
                    res.status(403).send({message: 'selected smart spreader already engaged, please select another smart spreader'})
                }
            }
        }
    } else {
        res.status(403).send({message:'receiver already confirmed for level'+req.body.payment_level})
    }
});
module.exports = router