import options from "./options.js";
import knex from "knex";

const connection = knex(options);

const autos = [
  {
    nombre: 'Mustang',
    precio: 40000
  },
  {
    nombre: 'Corolla Cross',
    precio: 28000
  },
  {
    nombre: 'Rav4',
    precio: 35000
  },
  {
    nombre: 'Chevrolet classic',
    precio: 35000
  }
];

connection('autos').insert(autos)
.then(() => console.log('Registros agregados con exito'))
.catch((err) => console.log(`Ha ocurrido un error ${err}`))
.finally(() => {
  connection.destroy();
});;