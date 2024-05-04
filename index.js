var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
const upload = multer( { dest: 'uploads/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {

  console.log('app.post firing');
  console.log(req.file, req.body);
  let responseObj = {};
  responseObj.name = req.file.originalname;
  responseObj.type = req.file.mimetype;
  responseObj.size = req.file.size;
  console.log(responseObj);
  return res.send(responseObj);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
