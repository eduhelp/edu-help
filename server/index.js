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



router.get('/', function(req,res) {
    res.sendFile(path.join(__dirname+"./../src/index.html"));
});

function connectDB(query, res) {
    return new Promise((resolve, reject)  => {
        pool.connect((err, db, done) => {
            if(err) {
                res.status(403).send({ message: 'problem to connect to db'})
            } else {
                console.log(query)
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

router.get('/rest/usersList', async function(req, res) {
    const curQuery = "select * from users"
    var result = await connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)  
    }
});

router.post('/rest/addUser', async function(req, res) {
    var curQuery = "insert into users(username, pwd, email, mobile, dob, gender, address, pincode, sponsor_id, status) values('"+req.body.username+"','"+req.body.pwd+"','"+req.body.email+"',"+req.body.mobile+",'"+req.body.dob+"','"+req.body.gender+"','"+req.body.address+"',"+req.body.pincode+","+req.body.sponsor_id+",'Inactive')"
    var result = await connectDB(curQuery, res)
    if(result) {
       res.status(200).send({ message: 'data inserted successfully..'})
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
    console.log(maxObj)
    outerLoop: for(var i=0; i<=maxObj.level; i++) {
        const filteredData = _.filter(resArr, function(obj) { return obj.level==i })
        console.log(filteredData)
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
    console.log(curQuery)
    var result = await connectDB(curQuery, res)
    return result
}
router.post('/rest/userLogin', async function(req, res) {
    var curQuery = "select user_id, username, email, mobile, dob, gender, address, pincode, sponsor_id, status from users where username='"+req.body.username+"' and pwd='"+req.body.pwd+"'"
    console.log(curQuery)
    var result = await connectDB(curQuery, res)
    if(result) {
        if(result.length === 0) {
            res.status(403).send({status: true, variant: 'error', message: 'Invalid username or password'})
        } else {
            res.status(200).send({ message: 'user authricated', data: result[0]})
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
    var curQuery = "insert into payments(from_id, to_id, payment_level, payment_value, payment_mode, from_bank, to_bank, transaction_id, confirm_status) values("+req.body.from_id+", "+req.body.to_id+",'"+req.body.payment_level+"',"+req.body.payment_value+",'"+req.body.payment_mode+"','"+req.body.from_bank+"','"+req.body.to_bank+"','"+req.body.transaction_id+"','Pending')"
    console.log(curQuery)
    var result = await connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)
    }
});

router.post('/rest/receivePaymentList', async function(req, res) {
    var curQuery = "select * from payments where payment_level="+req.body.payment_level+" and to_id="+req.body.user_id+" and confirm_status='Pending'"
    var result = await connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)
    }
});

router.post('/rest/myPaymentList', async function(req, res) {
    var curQuery = "select * from payments where from_id="+req.body.user_id
    var result = await connectDB(curQuery, res)
    if(result) {
        res.status(200).send(result)
    }
});

router.post('/rest/getUserDetails', async function(req, res) {
    var curQuery = "select * from users where user_id="+req.body.user_id
    var result = await connectDB(curQuery, res)
    if(result) {
        if(result.length === 0) {
            res.status(403).send({status: true, variant: 'error', message: 'Invalid Sponsor ID'})
        } else {
            res.status(200).send(result)
        }
    }
});

router.post('/rest/confirmLevelPayment', async function(req, res) {
    var updateQuery = "update payments set confirm_status='Confirmed' where payment_id="+req.body.payment_id
    var updateRes = await connectDB(updateQuery, res)
    if(updateRes) {
        if(req.body.payment_level === "1") {
            var retArr = []
            var curLevel = 0
            var nodeObj = {
                level: curLevel,
                node: req.body.sponsor_id
            }
            retArr.push(nodeObj)
            var resultArray = await getRootArray(req.body.sponsor_id, retArr, curLevel, res)
            console.log('resultArray')
            console.log(resultArray)
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
        console.log('resultArray')
        console.log(resultArray)
        var insReturn = await insertToPosition(req.body.user_id, resultArray, res)
    }
});

router.post('/rest/checkEligibility', async function(req, res) {
    var curQuery = "select * from payments where from_id="+req.body.user_id+" and payment_level='"+req.body.payment_level+"'"
    console.log(curQuery)
    var result = await connectDB(curQuery, res)
    if(result) {
        if(result.length === 0) {
            res.status(403).send({status: true, variant: 'error', message: 'Invalid username or password'})
        } else {
            res.status(200).send({ message: 'user authricated', data: result[0]})
        }
    }
});

router.post('/rest/myTree', async function(req, res) {
    var retArr = []
    var curLevel = 0
    var resultArray = await getMyTreeArray(req.body.user_id, retArr, curLevel, res)
    res.status(200).send(resultArray)
});

var userInfoList = "user_id, username, email, mobile, dob, gender, address, pincode, sponsor_id, status"
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
    var curQuery = "select * from positions where user_id="+req.body.user_id
    var curResult = await connectDB(curQuery, res)
    var resultArray = await getTopLevelArray(curResult[0].parent_id, retArr, curLevel, req.body.max_level, res)
    res.status(200).send(resultArray)
});

async function getTopLevelArray(user_id, retArr, getLevel, max_level, res) {
    var curQuery = "select * from positions where user_id="+user_id
    var curResult = await connectDB(curQuery, res)
    var curQuery = "select "+userInfoList+" from users where user_id="+curResult[0].user_id
    var result = await connectDB(curQuery, res)
    var nodeObj = {
        level: getLevel,
        parent_id: curResult[0].parent_id,
        nodeInfo: result[0]
    }
    retArr.push(nodeObj)
    if(max_level > getLevel && curResult[0].parent_id !== '0') {
        getLevel++
        await getTopLevelArray(curResult[0].parent_id, retArr, getLevel, max_level, res)
    } 
    return retArr;
}

app.use("/", router)
app.listen(9000);
console.log('server started... ');