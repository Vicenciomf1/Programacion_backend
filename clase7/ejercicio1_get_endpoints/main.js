const express = require('express');

const aplicacion = express();

const port = 8080;

const frase = 'Hola mundo cómo están';

aplicacion.get('/api/frase', (peticion, respuesta) => {
  respuesta.send(frase);
});

aplicacion.get('/api/letras/:num', (peticion, respuesta) => {
  const num = peticion.params.num;

  //Si no es un numero
  if (isNaN(num)) {
    respuesta.send({
      error: 'El param no es un num'
    });
    return;
  }

  const numFormateado = parseInt(num) - 1;
  //Si esta fuera de rango
  if (numFormateado < 0 || numFormateado >= frase.length) {
    respuesta.send({
      error: 'El param esta fuera de rango'
    });
    return;
  }

  
  const letra = frase[numFormateado];
  respuesta.send(letra);
});

aplicacion.get('/api/palabras/:num', (peticion, respuesta) => {
  const num = peticion.params.num;
  const fraseDividida = frase.split(' ');
  //Si no es un numero
  if (isNaN(num)) {
    respuesta.send({
      error: 'El param no es un num'
    });
    return;
  }

  const numFormateado = parseInt(num) - 1;
  //Si esta fuera de rango
  if (numFormateado < 0 || numFormateado >= fraseDividida.length) {
    respuesta.send({
      error: 'El param esta fuera de rango'
    });
    return;
  }
  
  const palabra = fraseDividida[numFormateado];

  respuesta.send(palabra);
});

const servidor = aplicacion.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));