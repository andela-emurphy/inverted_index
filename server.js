const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/src')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname ,'src/index.html'));
});

const port = process.env.PORT || 9000;

app.listen(port);
console.log('server started on port' + port );