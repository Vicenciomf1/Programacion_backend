const express = require('express');
const { Router } = express;

const aplicacion = express();

//Definir rutas
const rutaPersonas = Router();
const rutaMascotas = Router();

//Rutas
const puerto = 8080;

//Lineas para usar json
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

//Manejo de accesso
aplicacion.use((peticion, respuesta, next) => {
  const key = peticion.headers.key;
  if(key == 1234){
    next();//Autorizar ejecutar lo siguiente
  }
  respuesta.status(403).send('Acceso denegado!');
});

aplicacion.use((error, peticion, respuesta, next) => {
  respuesta.status(500).send('Ha ocurrido un error en el middleware!');
});

//Definimos los elementos en memoria
const personas = [];
const mascotas = [];

//Endpoints para cada ruta
rutaPersonas.get('/', (peticion, respuesta) => {
  respuesta.json(personas);
});

rutaPersonas.post('/', (peticion, respuesta) => {
  const persona = peticion.body;
  personas.push(persona);
  respuesta.send('ok');
});
 

rutaMascotas.get('/', (peticion, respuesta) => {
  respuesta.json(mascotas);
});

rutaMascotas.post('/', (peticion, respuesta) => {
  const mascota = peticion.body;
  mascotas.push(mascota);
  respuesta.send('ok');
});

//Ingresamos las rutas a la aplicacion
aplicacion.use('/personas', rutaPersonas);
aplicacion.use('/mascotas', rutaMascotas);

//Definimos el server
const servidor = aplicacion.listen(puerto, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));