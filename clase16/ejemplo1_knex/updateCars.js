import options from "./options.js";
import knex from "knex";

const connection = knex(options);

connection('autos').where('precio', 35000).update('precio', 38000)
.then(() => console.log(`actualizado con exito`))
.catch(err => console.log(err))
.finally(() => { connection.destroy() });