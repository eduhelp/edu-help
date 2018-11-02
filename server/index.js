var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');
var fs = require('fs');
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

router.get('/dashboard/:page', function(req,res) {
    var name = req.params.name;
    res.sendFile(path.join(__dirname+"./../src/index.html"));
});

router.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+"./../src/index.html"));
});

app.use("/", router)
app.use("/users", users)
app.use("/payments", payments)
app.use("/placements", placements)
app.use("/disputes", disputes)

var privateKey  = fs.readFileSync('/root/ssl/key.pem', 'utf8');
var certificate = fs.readFileSync('/root/ssl/cert.pem', 'utf8');

var credentials = { key: privateKey, cert: certificate };

// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
httpsServer.listen(443);


/*
var options = {
    key: fs.readFileSync('/root/ssl/key.pem'),
    cert: fs.readFileSync('/root/ssl/cert.pem')
  };
  
  var server = https.createServer(options, app);

    server.listen(80, function(){
        console.log("server running ...")
    }); */
  
// app.listen(80);
//app.listen(9000);
console.log('server started... ');