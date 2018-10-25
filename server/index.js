var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var users = require('./users')
var payments = require('./payments')
var placements = require('./placements')
var disputes = require('./disputes')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../screenshots')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.get('/screenshots/:name', function(req,res) {
    var name = req.params.name;
    res.sendFile(path.join(__dirname+"./../screenshots/"+name));
});

router.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+"./../src/index.html"));
});

app.use("/", router)
app.use("/users", users)
app.use("/payments", payments)
app.use("/placements", placements)
app.use("/disputes", disputes)


app.listen(80);
console.log('server started... ');