var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const { Client } = require('pg')
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();


router.get('/', function(req,res) {
    res.sendFile(path.join(__dirname+"./../src/index.html"));
});

var connect = "postgres://postgres:1234@localhost:5432/eduhelp";


const client = new Client({
    host: 'localhost',
    port: 5334,
    user: 'postgres',
    password: '1234',
    database: 'eduhelp',
  })
client.connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack))

app.use("/", router)
app.listen(9000);
console.log('server started... ');