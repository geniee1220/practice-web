const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(express.urlencoded({extended: true})) 


app.listen(8080, function () {
  console.log('listening on 8080');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/write', function (req, res) {
  res.sendFile(__dirname + '/pages/write.html');
});

app.post('/add', function (req, res) {
  res.send('전송 완료');
  console.log(req.body.title);
  console.log(req.body.date);
});

app.use('/assets', express.static(path.join(__dirname, '/assets')));


