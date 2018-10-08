var express = require('express');
var pg = require('pg');

let pool = new pg.Pool({
    port: 5432,
    password: '1234',
    database: 'eduhelp',
    max: 10,
    host: 'localhost',
    user: 'postgres'
})

module.exports = {
    connectDB: function (query, res) {
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
    },
    getCurrentDate: function() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        return mm + '/' + dd + '/' + yyyy;
    }
}