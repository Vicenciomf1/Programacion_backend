const express = require('express');
const multer = require('multer');

const aplicacion = express();

const puerto = 8080;

aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

//Configurar multer (el como se guarda)
const almacenamiento = multer.diskStorage({
  destination: (peticion, archivo, next) => {
    next(null, __dirname + '/uploads');
  },
  filename: (peticion, archivo, next) => {
    next(null, Date.now() + '-' + archivo.originalname);
  }
});

const upload = multer({
  storage: almacenamiento
});

//***** Hacemos la carpeta public visible
aplicacion.use('/static', express.static(__dirname + '/public'));

// Definir funcion de subida
aplicacion.post('/upload', upload.single('myFile') /*El middleware que lo guarda*/, (peticion, respuesta) => {
  //Es cuando ya se guardó y preparamosla respuesta al cliente
  const archivo = peticion.file;
  if (!archivo) {
    const error = new Error('El archivo no fue subido');
    error.httpStatusCode = 400;
    return next(error);
  }
  respuesta.send(archivo);
});




const servidor = aplicacion.listen(puerto, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));