
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000;


const fs = require('fs');
const data = fs.readFileSync('./database.json')
const conf =JSON.parse(data);


var mysql = require('mysql')
var connection = mysql.createConnection({
  host : conf.host,
  user : conf.user,
  password :conf.password,
  database : conf.database

})

connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers',(req, res)=>{
   connection.query(
     "select * from customer",
     (err, rows, fields) => {
       res.send(rows);
     }
   )
})

app.listen(port, ()=>console.log(`Listening on port ${port}`))