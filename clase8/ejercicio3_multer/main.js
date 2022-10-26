const express = require('express');
const multer = require('multer');

const aplicacion = express();

const port = 8080;

aplicacion.use(express.json())
aplicacion.use(express.urlencoded({ extended: true }))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({
  storage: storage
});

aplicacion.use('/static', express.static(__dirname + '/public'));

aplicacion.get('/', (peticion, respuesta) => {
  respuesta.sendFile(__dirname + '/public');
});

aplicacion.post('/uploadfile', upload.single('myFile'), (peticion, respuesta, next) => {
  const file = peticion.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatisCode = 400;
    return next(error);
  }
  respuesta.send(file);
});

aplicacion.post('/uploadmultiple', upload.array('myFiles', 12), (peticion, respuesta, next) => {
  const files = peticion.files;
  if (!files) {
    const error = new Error('Please upload a file');
    error.httpStatisCode = 400;
    return next(error);
  }
  respuesta.send(files);
});

const servidor = aplicacion.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));