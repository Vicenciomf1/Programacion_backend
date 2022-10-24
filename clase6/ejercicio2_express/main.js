//Definimos las librerias
const express = require('express');
const moment = require('moment');

//Instanciamos la app de express
const aplicacion = express();

//Colocamos el puerto de escucha
const puerto = '8080';

//Inicializamos el contador de las visitas
let visitas = 0;

//Definimos la ruta principal en donde mostraremos el mensaje
aplicacion.get('/', (peticion, respuesta) => {
  respuesta.send('<h1 style="color: blue">Bienvenidos al servidor express</h1>');
});

//Definimos la ruta de las visitas en donde mostraremos el contador
aplicacion.get('/visitas', (peticion, respuesta) => {
  visitas++;
  respuesta.send(`La cantidad de visitas es: ${visitas}`);
});

//Definimos la ruta para mostrar la fecha y la hora
aplicacion.get('/fyh', (peticion, respuesta) => {
  const fyh = moment(new Date());
  const fyhFormateado = fyh.format('DD/M/yyyy hh:mm:ss');
  respuesta.send({
    fyh: fyhFormateado
  });
});

//Hacemos que el app escuche en el puerto determinado
const servidor = aplicacion.listen(puerto, () => {
  console.log(`Servidor Http escuchando en el puerto ${servidor.address().port}`);
});

//Definimos la escucha al evento para mostrar los errores
servidor.on('error', error => console.log(`Error en servidor ${error}`));