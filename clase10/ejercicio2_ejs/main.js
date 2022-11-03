const express = require('express');

const aplicacion = express();
const puerto = 8080;

aplicacion.set('view engine', 'ejs');
// aplicacion.set('views', __dirname + '/views');

aplicacion.get('/datos', (peticion, respuesta) => {
  const min = peticion.query.min;
  const max = peticion.query.max;
  const nivel = peticion.query.nivel;
  const titulo = peticion.query.titulo;

  respuesta.render('hello', {
    titulo,
    max,
    min,
    nivel
  });
});

const servidor = aplicacion.listen(8080, () => {
  console.log(`Servidor escuchando en: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Ha ocurrido un error ${error}`));