const express = require('express')
const mySql = require('mysql');

const app = express()


app.get('/db',(req, res)=>{
    let sql = 'CREATE DATABASE nodesql5'
    db.query(sql,(err, result) =>{
      if (err) throw err;
      console.log("Result: ", result);
      res.send("Result: " + JSON.stringify(result) );
    })
})

app.get('/table', (req, res) => {
    let sql = 'CREATE TABLE lusers(id int AUTO_INCREMENT, last_name VARCHAR(255), PRIMARY KEY(id))'
    db.query(sql,(err, result) =>{
      if (err) throw err;
      console.log("Result: ", result);
      res.send("Result: " + JSON.stringify(result) );
    }) 
})
app.get('/adduser', (req, res) => {
    let user = {last_name: "levi"}
    let sql = 'INSERT INTO lusers SET ?'
    db.query(sql, user,(err, result) =>{
      if (err) throw err;
      console.log("Result: ", result);
      res.send("Result: " + JSON.stringify(result) );
    }) 
})
app.get('/getData', (req, res) => {
    let sql = 'SELECT * FROM lusers'
    db.query(sql, (err, result, fields) =>{
      if (err) throw err;
      console.log("Result: ", result);
      console.log("fields: ", fields);
      res.send("Result: " + JSON.stringify(result) );
    }) 
})
app.get('/getData/:id', (req, res) => {
    let sql = `SELECT * FROM lusers WHERE id = ${req.params.id}`
    db.query(sql, (err, result) =>{
      if (err) throw err;
      console.log("Result: ", result);
      res.send("Result: " , JSON.stringify(result) );
    }) 
})
app.get('/update/:id', (req, res) => {
    let newName = "levi"
    let sql = `UPDATE lusers SET last_name WHERE id = ${req.params.id}`
    db.query(sql, (err, result) =>{
      if (err) throw err;
      console.log("Result: ", result);
      res.send("Result: " + JSON.stringify(result) );
    }) 
})
app.get('/delete/:id', (req, res) => {
    let sql = `DELETE from lusers WHERE id = ${req.params.id}`
    db.query(sql, (err, result) =>{
      if (err) throw err;
      console.log(result);
      console.log(result.affectedRows)
      res.send("Result: " + JSON.stringify(result) );
    }) 
})
app.get('/deleteall/:table', (req, res) => {
    let sql = `DROP TABLE IF EXISTS ${req.params.table}`
    db.query(sql, (err, result) =>{
      if (err) throw err;
      console.log(result);
      res.send("Result: " + JSON.stringify(result) );
    }) 
})

app.listen(3000, console.log("listning to port 3000"))

const db = mySql.createConnection({
    host:"localhost",
    user:"root",
    password:"admin",
    database: "nodesql"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });