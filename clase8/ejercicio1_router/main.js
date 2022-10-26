const express = require('express');
const { Router } = express;

const aplicacion = express();
const rutaPersonas = Router();
const rutaMascotas = Router();

const port = 8080;

aplicacion.use(express.json())
aplicacion.use(express.urlencoded({ extended: true }))

const personas = [];

const mascotas = [];

rutaPersonas.get('/', (peticion, respuesta) => {
  respuesta.send(personas);
});

rutaPersonas.post('/', (peticion, respuesta) => {
  const persona = peticion.body;
  personas.push(persona);
  respuesta.send('post ok');
});

rutaMascotas.get('/', (peticion, respuesta) => {
  respuesta.send(mascotas);
});

rutaMascotas.post('/', (peticion, respuesta) => {
  const mascota = peticion.body;
  mascotas.push(mascota);
  respuesta.send('post ok');
});

aplicacion.use('/personas', rutaPersonas);
aplicacion.use('/mascotas', rutaMascotas);

const servidor = aplicacion.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));