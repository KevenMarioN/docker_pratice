const express = require('express');
const app = express();
const PORT = 5000;

app.get('/',(req,res) => {
  res.send(`<h1>Hello World</h1>`).status(200);
});

app.listen(PORT,() => console.log(`🔥 Server running in port ${PORT}`));