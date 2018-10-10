var express = require('express');
var pg = require('pg');

/*
//Local
let pool = new pg.Pool({
    port: 5432,
    password: '1234',
    database: 'eduhelp',
    max: 10,
    host: 'localhost',
    user: 'postgres'
})


//server
let pool = new pg.Pool({
    port: 5432,
    password: 'fgjgo874nvj7hv',
    database: 'EduHelp',
    max: 10,
    host: 'localhost',
    user: 'postgres'
})
*/


//server
let pool = new pg.Pool({
    port: 5432,
    password: 'dbPwd247',
    database: 'EduHelp',
    max: 10,
    host: '103.235.104.177',
    user: 'dbuser'
})

module.exports = {
    connectDB: function (query, res) {
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
    },
    getCurrentDate: function() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        return mm + '/' + dd + '/' + yyyy;
    }
}