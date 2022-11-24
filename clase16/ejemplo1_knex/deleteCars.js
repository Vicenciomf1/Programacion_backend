import options from "./options.js";
import knex from "knex";

const connection = knex(options);

connection('autos').del()
.then(() => console.log(`Registros eliminados con exito`))
.catch((err) => console.log(err))
.finally(() => { connection.destroy() });