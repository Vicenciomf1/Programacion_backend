import express from "express";
import { fork } from "child_process";

const app = express();

let visitas = 0;

const sumar = () => {
  let suma = 0;
  for (let i = 0; i < 5e9; i++) {
    suma += i;
  }
  return suma;
};

app.get('/', (req, res) => {
  res.json({
    visitas: ++visitas
  });
});

app.get('/calculo-bloq', (req, res) => {
  res.json({
    suma: sumar()
  });
});

app.get('/calculo-nobloq', (req, res) => {
  const hijo = fork('./computo.js');
  hijo.on('message', param => {
    if (param == 'listo') {
      hijo.send('start');
    } else {
      res.json({
        suma: param
      });
    }
  });
});

const PUERTO = 8080;
const server = app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en ${PUERTO}`);
});