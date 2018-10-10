var express = require('express');
var _ = require('lodash')
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

let pool = new pg.Pool({
    port: 5432,
    password: '1234',
    database: 'eduhelp',
    max: 10,
    host: 'localhost',
    user: 'postgres'
})

app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();
var userInfoList = "user_id, username, email, mobile, dob, gender, address, pincode, sponsor_id, status"


router.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+"./../src/index.html"));
});

function connectDB(query, res) {
    return new Promise((resolve, reject)  => {
        pool.connect((err, db, done) => {
            if(err) {
                res.status(403).send({ message: 'problem to connect to db'})
            } else {
                db.query(query, (err, table) => {
                    done();
                    if(err) {
                        res.status(403).send({ message: 'problem in executing query'})
                    } else {
                        resolve(table.rows)
                    }
                })
            }
        }) 
    });
}

function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
}

router.get('/rest/usersList', async function(req, res) {
    const curQuery = "select * from users"
    var result = await connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)  
    }
});

router.post('/rest/addUser', async function(req, res) {
    var curQuery = "insert into users(username, pwd, email, mobile, dob, gender, address, pincode, sponsor_id, status) values('"+req.body.username+"','"+req.body.pwd+"','"+req.body.email+"','"+req.body.mobile+"','"+req.body.dob+"','"+req.body.gender+"','"+req.body.address+"',"+req.body.pincode+","+req.body.sponsor_id+",'Inactive')"
    var result = await connectDB(curQuery, res)
    if(result) {
        var insQuery = "insert into payments(from_id, to_id, payment_level, payment_value, paid_status, receiver_type, receiver_confirm_date) values("+result[0].user_id+","+req.body.sponsor_id+",1,100,'Pending','Sponsor','"+getCurrentDate()+"')"
        var insResult = await connectDB(insQuery, res)
        if(insResult) {
            res.status(200).send({ message: 'data inserted successfully..'})
        }
    }
});

async function getRootArray(sp_id, retArr, getLevel, res) {
    var curQuery = "select * from positions where parent_id="+sp_id
    var curResult = await connectDB(curQuery, res)
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
            var curRes = await connectDB(countQuery, res)
            if(curRes[0].count <= 1) {
                var positions = (curRes[0].count == 0) ? 'L' : (curRes[0].count == 1) ? 'R' : 1
                var insQuery = "insert into positions(user_id, parent_id, placement) values("+user_id+","+filteredData[j].node+",'"+positions+"')"
                var insRes = await connectDB(insQuery, res)
                // res.status(200).send({ message: 'status updated successfully..'})
                break outerLoop;
            }
        }
    }
}

async function updateUser(user_id, res) {
    var curQuery = "update users set status='Active' where user_id="+user_id
    var result = await connectDB(curQuery, res)
    return result
}

router.post('/rest/userLogin', async function(req, res) {
    var curQuery = "select user_id, username, email, mobile, dob, gender, address, pincode, sponsor_id, status from users where (username='"+req.body.username+"' or mobile='"+req.body.username+"') and pwd='"+req.body.pwd+"'"
    var result = await connectDB(curQuery, res)
    if(result) {
        if(result.length === 0) {
            res.status(403).send({status: true, variant: 'error', message: 'Invalid username or password'})
        } else {
            res.status(200).send(result[0])
        }
    }
});

router.post('/rest/updateUserInfo', async function(req, res) {
    var curQuery = "update users set email='"+req.body.email+"', dob='"+req.body.dob+"', gender='"+req.body.gender+"', address='"+req.body.address+"', pincode='"+req.body.pincode+"' where user_id="+req.body.user_id
    var result = await connectDB(curQuery, res)
    if(result) {
        var selQuery = "select "+userInfoList+" from users where user_id="+req.body.user_id
        var selResult = await connectDB(selQuery, res)
        if (selResult) {
            res.status(200).send(selResult[0])
        }
    }
});

router.post('/rest/levelPayments', async function(req, res) {
    var curQuery = "select * from level_payments"
    var result = await connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)
    }
});

router.post('/rest/paymentDetails', async function(req, res) {
    var curQuery = "select * from payments where from_id="+req.body.user_id+" or to_id="+req.body.user_id
    var result = await connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)
    }
});

router.post('/rest/makeLevelPayment', async function(req, res) {
    var updQuery = "update payments set paid_status='Completed', payment_mode='"+req.body.payment_mode+"', from_bank='"+req.body.from_bank+"', to_bank='"+req.body.to_bank+"', transaction_id='"+req.body.transaction_id+"', transaction_date='"+getCurrentDate()+"', confirm_status='Pending' where payment_id="+req.body.payment_id
    var result = await connectDB(updQuery, res)
    if(result) {
        res.status(200).send({message: 'payment details successfully updated'})
    }
});

router.post('/rest/receivePaymentList', async function(req, res) {
    var curQuery = "select * from payments where payment_level="+req.body.payment_level+" and to_id="+req.body.user_id+" and confirm_status='Pending'"
    var result = await connectDB(curQuery, res)
    if(result) {
        for(var i=0; i<result.length; i++) {
            var selQuery = "select * from users where user_id="+result[i].from_id
            var selResult = await connectDB(selQuery, res)
            if (selResult) {
                result[i]['giverInfo'] = selResult[0]
            }
        }
        res.status(200).send(result)
    }
});

router.post('/rest/myPaymentList', async function(req, res) {
    var curQuery = "select * from payments where from_id="+req.body.user_id
    var result = await connectDB(curQuery, res)
    if(result) {
        for(var i=0; i<result.length; i++) {
            var selQuery = "select * from users where user_id="+result[i].to_id
            var selResult = await connectDB(selQuery, res)
            if (selResult) {
                result[i]['receiverInfo'] = selResult[0]
            }
        }
        res.status(200).send(result)
    }
});


router.post('/rest/getUserDetails', async function(req, res) {
    var curQuery = "select "+userInfoList+" from users where user_id="+req.body.user_id
    var result = await connectDB(curQuery, res)
    if(result) {
        if(result.length === 0) {
            res.status(403).send({status: true, variant: 'error', message: 'Invalid Sponsor ID'})
        } else {
            res.status(200).send(result[0])
        }
    }
});

router.post('/rest/confirmLevelPayment', async function(req, res) {
    var updateQuery = "update payments set confirm_status='Confirmed', confirm_date='"+getCurrentDate()+"' where payment_id="+req.body.payment_id
    var updateRes = await connectDB(updateQuery, res)
    if(updateRes) {
        if(req.body.receiver_type === "SmartSpreader") {
            var updQuery = "update smart_spreaders set current_status='Completed', completed_date='"+getCurrentDate()+"', payment_id="+req.body.payment_id+" where user_id="+req.body.to_id+" and current_status='InProgress'"
            var updRes = await connectDB(updQuery, res)
            var insQuery = "insert into smart_spreaders(user_id, added_date, current_status) values("+req.body.to_id+",'"+getCurrentDate()+"','Active')"
            var insRes = await connectDB(insQuery, res)
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
            if(updResult) {
                res.status(200).send({message: 'Confirmaton status successfully updated for level-'+req.body.payment_level})
            }
        } else {
            res.status(200).send({message: 'Confirmaton status successfully updated for level-'+req.body.payment_level})
        }
        
    }
});

router.post('/rest/changeUserStatus', async function(req, res) {
    var updateQuery = "update users set status='Active' where user_id="+req.body.user_id
    var updateRes = await connectDB(updateQuery, res)
    if(updateRes) {
        var retArr = []
        var curLevel = 0
        var nodeObj = {
            level: curLevel,
            node: req.body.sponsor_id
        }
        retArr.push(nodeObj)
        var resultArray = await getRootArray(req.body.sponsor_id, retArr, curLevel, res)
        var insReturn = await insertToPosition(req.body.user_id, resultArray, res)
    }
});

router.post('/rest/levelEligibility', async function(req, res) {
    var curQuery = "select * from payments where from_id="+req.body.user_id+" and payment_level='"+req.body.payment_level+"'"
    var result = await connectDB(curQuery, res)
    if(result) {
        if(result.length === 0) {
            res.status(200).send({ eligibility: false })
        } else {
            res.status(200).send({ eligibility: true })
        }
    }
});

router.post('/rest/myTree', async function(req, res) {
    var retArr = []
    var curLevel = 0
    var resultArray = await getMyTreeArray(req.body.user_id, retArr, curLevel, res)
    res.status(200).send(resultArray)
});

async function getMyTreeArray(sp_id, retArr, getLevel, res) {
    var curQuery = "select * from positions where parent_id="+sp_id
    var curResult = await connectDB(curQuery, res)
    var curLevel = getLevel + 1
    for(var i=0; i<curResult.length; i++) {
        var curQuery = "select "+userInfoList+" from users where user_id="+curResult[i].user_id
        var result = await connectDB(curQuery, res)
        var nodeObj = {
            level: curLevel,
            nodeInfo: result[0]
        }
        retArr.push(nodeObj)
    }
    for(var i=0; i<curResult.length; i++) {
        await getMyTreeArray(curResult[i].user_id, retArr, curLevel, res)
    }
    return retArr
}

router.post('/rest/myTopLevel', async function(req, res) {
    var retArr = []
    var curLevel = 1
    var resultArray = []
    var curQuery = "select * from positions where user_id="+req.body.user_id
    var curResult = await connectDB(curQuery, res)
    if (curResult.length > 0) {
        resultArray = await getTopLevelArray(curResult[0].parent_id, retArr, curLevel, req.body.max_level, res)
    }
    res.status(200).send(resultArray)
});

async function getTopLevelArray(user_id, retArr, getLevel, max_level, res) {
    var curQuery = "select * from positions where user_id="+user_id
    var curResult = await connectDB(curQuery, res)
    var curQuery = "select "+userInfoList+" from users where user_id="+curResult[0].user_id
    var result = await connectDB(curQuery, res)
    var findRootLevelId = await getMyParentLevelWise(user_id, getLevel, res)
    var eligibility = ''
    if (findRootLevelId) {
        var eliQuery = "select * from payments where from_id="+user_id+" and payment_level='"+getLevel+"'"
        var eliResult = await connectDB(eliQuery, res)
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
        var curResult = await connectDB(curQuery, res)
        if (curResult) {
            if (curResult[0].parent_id === '0' && i<maxLevel) {
                haveRootLevel = false
                break outerLoop;
            } else {
                cur_user_id = curResult[0].parent_id
            }
        }
    }
    return haveRootLevel
}

router.post('/rest/activeSmartSpreader', async function(req, res) {
    var curQuery = "select * from smart_spreaders t1 left join users t2 on t1.user_id = t2.user_id  where t1.current_status='Active' order by t1.spreader_id limit 1"
    var result = await connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result[0])
    }
});

router.post('/rest/addConfirmReceiver', async function(req, res) {
    var insQuery = "insert into payments(from_id, to_id, payment_level, payment_value, paid_status, receiver_type, receiver_confirm_date) values("+req.body.from_id+","+req.body.to_id+","+req.body.payment_level+","+req.body.payment_value+",'Pending','"+req.body.receiver_type+"','"+getCurrentDate()+"')"
    if(req.body.receiver_type == 'RootParent') {
        var result = await connectDB(insQuery, res)
        if(result) {
            res.status(200).send({message: 'receiver confirmed from root parent'})
        }
    } else if(req.body.receiver_type == 'SmartSpreader') {
        var curQuery = "select * from smart_spreaders t1 left join users t2 on t1.user_id = t2.user_id  where t1.current_status='Active' order by t1.spreader_id limit 1"
        var result = await connectDB(curQuery, res)
        if(result) {
            if(result[0].user_id == req.body.to_id) {
                var updQuery = "update smart_spreaders set current_status='InProgress' where user_id="+req.body.to_id
                var updResult = await connectDB(updQuery, res)
                if(updResult) {
                    var result = await connectDB(insQuery, res)
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

app.use("/", router)
app.listen(9000);
console.log('server started... ');