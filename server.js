const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
app.use(express.urlencoded({extended: true})) 
const MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb+srv://admin:x1drTGsMJSuXATlE@cluster0.nmefy4t.mongodb.net/?retryWrites=true&w=majority',function(error,client){
  if(error) return console.log('error');

  app.listen(8080, function () {
    console.log('listening on 8080');
  });  
})

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


