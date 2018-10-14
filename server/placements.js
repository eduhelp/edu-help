var express = require('express');
var _ = require('lodash')
var pg_connect = require('./pg_connect');
var router = express.Router();
var userInfoList = "user_id, username, email, mobile, dob, gender, address, pincode, sponsor_id, status"

router.post('/myTree', async function(req, res) {
    var retArr = []
    var curLevel = 0
    var resultArray = await getMyTreeArray(req.body.user_id, retArr, curLevel, res)
    res.status(200).send(resultArray)
});

async function getMyTreeArray(sp_id, retArr, getLevel, res) {
    var curQuery = "select * from positions where parent_id="+sp_id
    var curResult = await pg_connect.connectDB(curQuery, res)
    var curLevel = getLevel + 1
    for(var i=0; i<curResult.length; i++) {
        var curQuery = "select "+userInfoList+" from users where user_id="+curResult[i].user_id
        var result = await pg_connect.connectDB(curQuery, res)
        var nodeObj = {
            level: curLevel,
            parent_id: sp_id,
            user_id: result[0].user_id,
            nodeInfo: result[0]
        }
        retArr.push(nodeObj)
    }
    for(var i=0; i<curResult.length; i++) {
        await getMyTreeArray(curResult[i].user_id, retArr, curLevel, res)
    }
    return retArr
}

router.post('/myTopLevel', async function(req, res) {
    var retArr = []
    var curLevel = 1
    var resultArray = []
    var curQuery = "select * from positions where user_id="+req.body.user_id
    var curResult = await pg_connect.connectDB(curQuery, res)
    if (curResult.length > 0 && req.body.user_id !== '1') {
        resultArray = await getTopLevelArray(curResult[0].parent_id, retArr, curLevel, req.body.max_level, res)
    }
    res.status(200).send(resultArray)
});

async function getTopLevelArray(user_id, retArr, getLevel, max_level, res) {
    var curQuery = "select * from positions where user_id="+user_id
    var curResult = await pg_connect.connectDB(curQuery, res)
    var curUserQuery = "select "+userInfoList+" from users where user_id="+curResult[0].user_id
    var result = await pg_connect.connectDB(curUserQuery, res)

    var bnkQuery = "select * from user_bank_details where user_id="+curResult[0].user_id
    var bnkresult = await pg_connect.connectDB(bnkQuery, res)
    result[0]['bank_details'] = bnkresult[0]

    var findRootLevelId = await getMyParentLevelWise(user_id, getLevel, res)
    var eligibility = ''
    if (findRootLevelId) {
       /* var firstQuery = "select * from payments where from_id="+user_id+" and payment_level=1"
        var firstResult = await pg_connect.connectDB(firstQuery, res)
        if(firstResult.length === 0) { */
            var eliQuery = "select * from payments where from_id="+user_id+" and payment_level="+getLevel
            var eliResult = await pg_connect.connectDB(eliQuery, res)
            if(eliResult) {
                if(eliResult.length === 0) {
                    eligibility = false
                } else {
                    eligibility = true
                }
            }
        /*} else {
            eligibility = false
        } */

    } else {
        eligibility = true
    }
    var nodeObj = {
        level: getLevel,
        parent_id: curResult[0].parent_id,
        nodeInfo: result[0],
        levelEligibility: eligibility
    }
    retArr.push(nodeObj)
    if(max_level > getLevel && curResult[0].parent_id !== '0') {
        getLevel++
        await getTopLevelArray(curResult[0].parent_id, retArr, getLevel, max_level, res)
    } 
    return retArr;
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

router.post('/activeSmartSpreader', async function(req, res) {
    var curQuery = "select * from smart_spreaders t1 left join users t2 on t1.user_id = t2.user_id  where t1.current_status='Active' and t1.payment_level="+req.body.payment_level+" order by t1.spreader_id limit 1"
    var result = await pg_connect.connectDB(curQuery, res)
    if(result) {
        if(result.length > 0) {
            res.status(200).send([{message: 'no smart spreader'}])
        } else {
            var bnkQuery = "select * from user_bank_details where user_id="+result[0].user_id
            var bnkresult = await pg_connect.connectDB(bnkQuery, res)
            result[0]['bank_details'] = bnkresult[0]
            res.status(200).send(result[0])
        }
    }
});

router.post('/myNodePlacements', async function(req, res) {
    var retArr = []
    var curLevel = 0
    var curQuery = "select "+userInfoList+" from users where user_id="+req.body.user_id
    var result = await pg_connect.connectDB(curQuery, res)
    var nodeObj = {
        level: curLevel,
        nodeInfo: result[0],
        user_id: result[0].user_id,
        childrens: []
    }
    retArr.push(nodeObj)

    var resultArray = await getmyNodePlacementsArray(req.body.user_id, retArr, curLevel, res)
    res.status(200).send(resultArray)
});

async function getmyNodePlacementsArray(sp_id, retArr, getLevel, res) {
    var curQuery = "select * from positions where parent_id="+sp_id
    var curResult = await pg_connect.connectDB(curQuery, res)
    var curLevel = getLevel + 1
    for(var i=0; i<curResult.length; i++) {
        var curQuery = "select "+userInfoList+" from users where user_id="+curResult[i].user_id
        var result = await pg_connect.connectDB(curQuery, res)
        var nodeObj = {
            level: curLevel,
            nodeInfo: result[0],
            user_id: result[0].user_id,
            childrens: []
        }
        var findRoot = _.find(retArr, (n) => { return n.user_id == sp_id})
        //retArr.push(nodeObj)
        findRoot
    }
    for(var i=0; i<curResult.length; i++) {
        await getMyTreeArray(curResult[i].user_id, retArr, curLevel, res)
    }
    return retArr
}

module.exports = router
