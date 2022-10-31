const express = require('express');

const aplicacion = express();
const puerto = 8080;

//***** Hacemos la carpeta public visible
aplicacion.use('/static', express.static(__dirname + '/public'));

//Definimos el server
const servidor = aplicacion.listen(puerto, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));