const express = require('express');
const mysql = require('mysql');

const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "admin",
    database: "school"
})
db.connect(err => {
    if (err) throw err;
    console.log("DB Connected!");
})

app.get('/create_DB/:data_base', (req, res) => {
    let sql = `CREATE DATABASE ${req.params.data_base}`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err.sqlMessage);
        }
        console.log("Result: ", result);
        res.send("Result: " + JSON.stringify(result));
    }
    )
})
app.get('/create_table/courses', (req, res) => {
    let sql = `CREATE TABLE courses(id int AUTO_INCREMENT, course_name VARCHAR(255), details VARCHAR(255), PRIMARY KEY(id))`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err.sqlMessage);
        }
        console.log("Result: ", result);
        res.send("Result: " + JSON.stringify(result));
    }
    )
})

app.get('/create_table/:table_name', (req, res) => {
    let sql = `CREATE TABLE ${req.params.table_name}(id int AUTO_INCREMENT, first_name VARCHAR(255), last_name VARCHAR(255), PRIMARY KEY(id))`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err.sqlMessage);
        }
        console.log("Result: ", result);
        res.send("Result: " + JSON.stringify(result));
    }
    )
})

app.get('/add/courses/:course/:details', (req, res) => {
    let person = {
        course_name: req.params.course,
        details: req.params.details
    }
    let sql =` INSERT INTO courses SET ?`
    db.query(sql, person, (err, result) => {
        if (err) {
            console.log(err);
            res.send(err.sqlMessage);
        }
        console.log("Result: ", result);
        res.send("person: " + JSON.stringify(person));
    })
})

app.get('/add/columns/:table/:cloumns', (req, res) => {
    let sql = `ALTER TABLE ${req.params.table} ADD ${req.params.cloumns} VARCHAR(255)`
    db.query(sql, (err, result, fields) =>{
      if (err) throw err;
      console.log("Result: ", result);
      console.log("fields: ", fields);
      res.send("Result: " + JSON.stringify(result) );
    }) 
})

app.get('/add/:name/:first_name/:last_name', (req, res) => {
    let person = {
        first_name: req.params.first_name,
        last_name: req.params.last_name
    }
    let sql =` INSERT INTO ${req.params.name} SET ?`
    db.query(sql, person, (err, result) => {
        if (err) {
            console.log(err)
            res.send(err.sqlMessage);
        }
        console.log("Result: ", result);
        res.send("person: " + JSON.stringify(person));
    })
})

app.get('/getData/all', (req, res) => {
    let sql = `SELECT * FROM courses
                CROSS JOIN teacher
                CROSS JOIN student`
    db.query(sql, (err, result, fields) =>{
      if (err) throw err;
      console.log(result);
      res.send("Result: " + JSON.stringify(result) );
    }) 
})
app.get('/getData/:table', (req, res) => {
    let sql = `SELECT * FROM ${req.params.table}`
    db.query(sql, (err, result, fields) =>{
      if (err) throw err;
      console.log("Result: ", result);
      console.log("fields: ", fields);
      res.send("Result: " + JSON.stringify(result) );
    }) 
})
app.get('/update/:table/:columns/:row/:course_id', (req, res) => {
    let sql = `UPDATE ${req.params.table} 
                SET ${req.params.columns} = ${req.params.course_id} 
                WHERE ${req.params.course_id} = id`
    db.query(sql, (err, result, fields) =>{
      if (err) throw err;
      console.log("Result: ", result);
      console.log("fields: ", fields);
      res.send("Result: " + JSON.stringify(result) );
    }) 
})



app.listen(3000, console.log("listning to port 3000"))