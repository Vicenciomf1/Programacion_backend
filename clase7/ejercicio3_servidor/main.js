//Definimos las librerias
const express = require('express');
const bodyParser = require("body-parser");

//Instanciamos la app de express
const aplicacion = express();

//Colocamos el puerto de escucha
const puerto = '8080';

aplicacion.use(bodyParser.urlencoded({ extended: false }));
aplicacion.use(bodyParser.json());

//Inicializamos la frase
let frase = 'Frase Inicial'

//Definimos la ruta para mostrar la frase
aplicacion.get('/api/frase', (peticion, respuesta) => {
  respuesta.send({
    frase: frase
  });
});

//Definimos la ruta para mostrar las palabras
aplicacion.get('/api/palabras/:pos', (peticion, respuesta) => {
  const indice = peticion.params.pos;
  const fraseQuebrada = frase.split(' ');
  if (isNaN(indice)) {
    respuesta.send({
      error: 'El parámetro no es un número'
    });
    return;
  }
  if (indice > fraseQuebrada.length && indice < 1) {
    respuesta.send({
      error: 'El parámetro está fuera de rango'
    });
    return;
  }
  const indiceFormateado = parseInt(indice) - 1;
  const palabra = fraseQuebrada[indiceFormateado];
  respuesta.send({
    palabra: palabra
  });
});

//Definimos nuestro post para insertar palabras
aplicacion.post('/api/palabras', (peticion, respuesta) => {
  const palabra = peticion.body.palabra;
  frase += ' ' + palabra;
  respuesta.json({
    agregada: palabra,
  });
});

//Definimos nuestro put para cambiar de palabra
aplicacion.put('/api/palabras/:pos', (peticion, respuesta) => {
  const indice = peticion.params.pos;
  const palabra = peticion.body.palabra;
  const fraseQuebrada = frase.split(' ');
  if (isNaN(indice)) {
    respuesta.send({
      error: 'El parámetro no es un número'
    });
    return;
  }
  if (indice > fraseQuebrada.length && indice < 1) {
    respuesta.send({
      error: 'El parámetro está fuera de rango'
    });
    return;
  }
  const indiceFormateado = parseInt(indice) - 1;
  fraseQuebrada[indiceFormateado] = palabra;
  frase = fraseQuebrada.join(' ');
  respuesta.send({
    success: 'ok',
  });
});

//Definimos nuestro delete para eliminar palabras
aplicacion.delete('/api/palabras/:pos', (peticion, respuesta) => {
  const indice = peticion.params.pos;
  const fraseQuebrada = frase.split(' ');
  if (isNaN(indice)) {
    respuesta.send({
      error: 'El parámetro no es un número'
    });
    return;
  }
  if (indice > fraseQuebrada.length && indice < 1) {
    respuesta.send({
      error: 'El parámetro está fuera de rango'
    });
    return;
  }
  const indiceFormateado = parseInt(indice) - 1;
  fraseQuebrada.splice(indiceFormateado,1);
  frase = fraseQuebrada.join(' ');
  respuesta.send({
    success: 'ok',
  });
});

//Hacemos que el app escuche en el puerto determinado
const servidor = aplicacion.listen(puerto, () => {
  console.log(`Servidor Http escuchando en el puerto ${servidor.address().port}`);
});

//Definimos la escucha al evento para mostrar los errores
servidor.on('error', error => console.log(`Error en servidor ${error}`));