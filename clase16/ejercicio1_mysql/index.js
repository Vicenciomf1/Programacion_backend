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

const callback = () => {
  //Creamos la tabla
  connection.schema.createTable('articulos', (table) => {
    table.increments('id').primary;
    table.string('nombre', 15).notNullable();
    table.string('codigo', 10).notNullable();
    table.float('precio');
    table.integer('stock');
  })
  .then(() => {

    //Insertamos los articulos
    connection('articulos').insert(articulos)
    .then(() => {

      //Consultamos los articulos y los imprimimos en consola
      connection('articulos')
      .then((consulta) => {
        console.log(consulta);

        //Elimiar el id 3
        connection('articulos').where('id', 3).del()
        .then(() => {

          //Actualizar el id 2, dejandole el stock en 0
          connection('articulos').where('id', 2).update({ stock: 0 })
          .then(() => {});

        });

      });

    });

  });

};

connection.schema.hasTable('articulos')
.then((exists) => {

  if (exists) {
    connection.schema.dropTable('articulos')
    .then(callback);
  } else {
    callback();
  }

});