const express = require('express');

const aplicacion = express();
const puerto = 8080;

aplicacion.set('view engine', 'ejs'); // registra el motor de plantillas
aplicacion.set('views', './views'); // especifica el directorio de vistas

//Lineas para usar json
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

const personas = [];

aplicacion.get('/personas', (req, res) => {
  res.render('formulario', {
    personas
  });
});

aplicacion.post('/personas', (req, res) => {
  const persona = req.body;
  personas.push(persona);
  res.render('formulario', {
    personas
  });
});

//***********

//Definimos el server
const servidor = aplicacion.listen(puerto, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));