
const bodyParser = require('body-parser')

const port = process.env.PORT || 5000;

const express = require("express");
const app = express();

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

const multer = require('multer');
const upload = multer({dest:'./upload'})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/image', express.static('./upload'));
app.post('/api/customers', upload.single('image'),(req, res)=>{
  let sql='insert into customer values(null,?,?,?,?,?,now(),0)';
  let image='http://localhost:5000/image'+req.file.fileName;
  let name =req.body.name;
  let birthday =req.body.birthday;
  let gender =req.body.gender;
  let job =req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params,
    (err, rows, fields)=>{
      res.send(rows);
    })
})

app.get('/api/customers',(req, res)=>{
   connection.query(
     "select * from customer where isDeleted=0",
     (err, rows, fields) => {
       res.send(rows);
     }
   )
})

app.delete('/api/customers/:id',(req, res)=>{
  let sql = 'update customer set isDeleted=1 where id=?';
  let params =[req.params.id];
  connection.query(sql, params,
    (err, rows, fields)=>{
      res.send(rows);
    })

})
app.listen(port, ()=>console.log(`Listening on port ${port}`))