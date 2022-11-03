const express = require('express');

const aplicacion = express();
const puerto = 8080;

//Lineas para usar json
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

aplicacion.set('view engine', 'ejs');

const personas = [];

aplicacion.post('/personas', (peticion, respuesta) => {
  const persona = peticion.body;
  personas.push(persona);
  respuesta.render('index', {
    personas
  });
});

aplicacion.get('/', (peticion, respuesta) => {
  respuesta.render('index', {
    personas
  });
});

const servidor = aplicacion.listen(8080, () => {
  console.log(`Servidor escuchando en: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Ha ocurrido un error ${error}`));