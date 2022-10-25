const express = require('express');

const aplicacion = express();

aplicacion.use(express.json())
aplicacion.use(express.urlencoded({ extended: true }))

const port = 8080;

let frase = 'Frase Inicial';

aplicacion.get('/api/frase', (peticion, respuesta) => {
  respuesta.json({
    frase: frase
  });
});

aplicacion.get('/api/palabras/:pos', (peticion, respuesta) => {
  const pos = peticion.params.pos;
  const fraseDividida = frase.split(' ');
  //Si no es un numero
  if (isNaN(pos)) {
    respuesta.send({
      error: 'El param no es un num'
    });
    return;
  }

  const numFormateado = parseInt(pos) - 1;
  //Si esta fuera de rango
  if (numFormateado < 0 || numFormateado >= fraseDividida.length) {
    respuesta.send({
      error: 'El param esta fuera de rango'
    });
    return;
  }
  
  const palabra = fraseDividida[numFormateado];

  respuesta.json({
    buscada: palabra
  });
});

aplicacion.post('/api/palabras', (peticion, respuesta) => {
  const palabra = peticion.body.palabra;

  frase += ' ' + palabra; 
  const palabras = frase.split(' ');
  const cantidadPalabras = palabras.length;

  respuesta.json({
    agregada: palabra,
    pos: cantidadPalabras
  });
});

aplicacion.put('/api/palabras/:pos', (peticion, respuesta) => {
  const nuevaPalabra = peticion.body.palabra;
  const pos = parseInt(peticion.params.pos) - 1;

  const palabras = frase.split(' ');
  const anterior = palabras[pos];

  palabras[pos] = nuevaPalabra;

  frase = palabras.join(' ');

  respuesta.json({
    actualizada: nuevaPalabra,
    anterior: anterior
  });
});

aplicacion.delete('/api/palabras/:pos', (peticion, respuesta) => {
  const pos = parseInt(peticion.params.pos) - 1;

  const palabras = frase.split(' ');
  palabras.splice(pos, 1);

  frase = palabras.join(' ');

  respuesta.json({
    status: "ok"
  });
});

const servidor = aplicacion.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));