const express = require('express');

const aplicacion = express();

aplicacion.use(express.json())
aplicacion.use(express.urlencoded({ extended: true }))

const port = 8080;

aplicacion.get('/api/sumar/:num1/:num2', (peticion, respuesta) => {
  const num1 = parseInt(peticion.params.num1);
  const num2 = parseInt(peticion.params.num2);

  const suma = num1 + num2;
  respuesta.json(suma);
});

aplicacion.get('/api/sumar', (peticion, respuesta) => {
  const num1 = parseInt(peticion.query.num1);
  const num2 = parseInt(peticion.query.num2);

  const suma = num1 + num2;
  respuesta.json(suma);
})

aplicacion.get('/api/operacion/:operacion', (peticion, respuesta) => {
  const operacion = peticion.params.operacion; //5+7

  const numeros = operacion.split('+');// [5, 7]
  const num1 = parseInt(numeros[0]);
  const num2 = parseInt(numeros[1]);

  const suma = num1 + num2;// 5 + 7 = 12
  respuesta.json(suma);
});

aplicacion.post('/api', (peticion, respuesta) => {
  respuesta.json({
    status: "ok"
  });
});

aplicacion.put('/api', (peticion, respuesta) => {
  respuesta.json({
    status: "ok"
  });
});

aplicacion.delete('/api', (peticion, respuesta) => {
  respuesta.json({
    status: "ok"
  });
});

const servidor = aplicacion.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));