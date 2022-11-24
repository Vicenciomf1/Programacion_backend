import options from "./options.js";
import knex from "knex";

const connection = knex(options);

const articulos = [
  {
    nombre: 'Iphone 10',
    codigo: 'xxxxxx',
    precio: 1000,
    stock: 20,
  },
  {
    nombre: 'Iphone 11',
    codigo: 'xxxxxx',
    precio: 1100,
    stock: 22,
  },
  {
    nombre: 'Iphone 12',
    codigo: 'xxxxxx',
    precio: 1200,
    stock: 25,
  },
  {
    nombre: 'Iphone 13',
    codigo: 'xxxxxx',
    precio: 1300,
    stock: 10,
  },
  {
    nombre: 'Iphone 14',
    codigo: 'xxxxxx',
    precio: 1400,
    stock: 30,
  },
];

( async () => {

  try {
    const exists = await connection.schema.hasTable('articulos');

    if (exists) {
      await connection.schema.dropTable('articulos');
    }

    await connection.schema.createTable('articulos', (table) => {
      table.increments('id').primary;
      table.string('nombre', 15).notNullable();
      table.string('codigo', 10).notNullable();
      table.float('precio');
      table.integer('stock');
    });

    await connection('articulos').insert(articulos);

    const consulta = await connection('articulos');
    console.table(consulta);    

    await connection('articulos').where('id', 3).del();

    await connection('articulos').where('id', 2).update({ stock: 0 });

    connection.destroy();

  } catch (error) {
    console.log(error);
  }

})()
