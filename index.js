var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
const multer = require('multer');

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const storage = multer.memoryStorage(); // store file in memory
// multer.memoryStorage() is a built-in function that stores the file in memory as a Buffer object.
const upload = multer({ storage: storage }); // upload file to memory
// multer({ storage: storage }) is a built-in function that uploads the file to memory.
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const { originalname, mimetype, size } = req.file;

  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
