const path = require('path');

require('dotenv').config({
  path: process.env.MODO === 'byn' ? path.resolve(__dirname, 'byn.env') : path.resolve(__dirname, 'colores.env')
});

const fondo = process.env.FONDO;
const frente = process.env.FRENTE;

console.log({ fondo, frente });