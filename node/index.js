const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 5000;
const config = {
  host : 'db',
  user : 'root',
  password : 'root',
  database : 'nodedb'
};

const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) values('Keven')`;
const sqlSelect = `SELECT * FROM people;`
connection.query(sql);
app.get('/', async (req,res) => {
let peoples;
 await connection.query(sqlSelect,function (error,results,fields){
    if (error) throw error;
    const data = results.map((result) => result.name);
  });
  res.send(`
  <h1>Hello World</h1>
  `).status(200);
});

app.listen(PORT,() => console.log(`🔥 Server running in port ${PORT}`));