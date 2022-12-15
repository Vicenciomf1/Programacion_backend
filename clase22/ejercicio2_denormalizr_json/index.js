import { schema, normalize, denormalize } from 'normalizr';
import fs from 'fs';
import util from 'util';

const print = (object) => {
  console.log(util.inspect(object, false, 12, true));
}

const empresa = JSON.parse(fs.readFileSync('./empresa.json'));

//Definir los schemas
const empleadoSchema = new schema.Entity('empleados');

const empresaSchema = new schema.Entity('empresa', {
  gerente: empleadoSchema,
  encargado: empleadoSchema,
  empleados: [empleadoSchema],
});

//Normalizar
const empresaNormalizada = normalize(empresa, empresaSchema);
print(empresaNormalizada);

console.log(`Tamaño del objeto sin normalizar: ${JSON.stringify(empresa).length}`);
console.log(`Tamaño del objeto normalizado: ${JSON.stringify(empresaNormalizada).length}`);

//Desnormalizar
const empresaDesnormalizada = denormalize(empresaNormalizada.result, empresaSchema, empresaNormalizada.entities);
print(empresaDesnormalizada);
console.log(`Tamaño del objeto desnormalizado: ${JSON.stringify(empresaDesnormalizada).length}`);
