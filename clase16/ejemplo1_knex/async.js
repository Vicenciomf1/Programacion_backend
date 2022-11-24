import options from "./options.js";
import knex from "knex";

const connection = knex(options);

const autos = [
  {
    nombre: 'Mustang Nuevo',
    precio: 40000
  }
];

( async () => {
  try {
    const exists = await connection.schema.hasTable('autos');

    if (!exists) {
      await connection.schema.createTable('autos', (table) => {
        table.increments('id').primary();
        table.string('nombre', 500).notNullable();
        table.integer('precio').notNullable();
      });
    }
    //insert
    await connection('autos').insert(autos);

    //consulta
    const consulta = await connection('autos');

    consulta.forEach((auto) => {
      console.log(`Id: ${auto.id}, Nombre: ${auto.nombre}, Precio: ${auto.precio}`);
    });

    connection.destroy();

  } catch (error) {
    console.log(`Ha ocurrido un error ${error}`)
  }
  
})();

