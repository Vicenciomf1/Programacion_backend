const express = require('express');

const aplicacion = express();
const puerto = 8080;

aplicacion.set('view engine', 'ejs'); // registra el motor de plantillas
aplicacion.set('views', './views'); // especifica el directorio de vistas

aplicacion.get('/datos', (req, res) => {
  const max = req.query.max;
  const min = req.query.min;
  const value = req.query.nivel;
  const titulo = req.query.titulo;

  const size = max - min;
  const balancedValue = value - min;

  res.render('hello', {
    size: size,
    max: max,
    min: min,
    value: balancedValue,
    titulo: titulo,
  });
});

//***********

//Definimos el server
const servidor = aplicacion.listen(puerto, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));