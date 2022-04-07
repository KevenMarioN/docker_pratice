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

const sql = `INSERT INTO people(name) values('Keven')`
connection.query(sql);
connection.end();
app.get('/',(req,res) => {
  res.send(`<h1>Hello World</h1>`).status(200);
});

app.listen(PORT,() => console.log(`🔥 Server running in port ${PORT}`));