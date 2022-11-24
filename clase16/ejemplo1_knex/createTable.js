import options from "./options.js";
import knex from "knex";

const connection = knex(options);

connection.schema.hasTable('autos')
.then((exists) => {
  if (!exists) {
    connection.schema.createTable('autos', (table) => {
      table.increments('id').primary();
      table.string('nombre', 500).notNullable();
      table.integer('precio').notNullable();
    })
    .then(() => console.log('La tabla ha sido creada con exito'))
    .catch((err) => console.log(`Error al crear la tabla: ${err}`));
  }
})
.finally(() => {
  connection.destroy();
});;

