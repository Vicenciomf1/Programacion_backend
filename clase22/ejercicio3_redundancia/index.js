import { schema, normalize, denormalize } from 'normalizr';
import fs from 'fs';
import util from 'util';

const print = (object) => {
  console.log(util.inspect(object, false, 12, true));
};

const holding = JSON.parse(fs.readFileSync('./holding.json'));

//Definir los schemas
const empleadoSchema = new schema.Entity('empleados');

const empresaSchema = new schema.Entity('empresas', {
  gerente: empleadoSchema,
  encargado: empleadoSchema,
  empleados: [empleadoSchema]
});

const cadenaEmpresasSchema = new schema.Entity('cadenasEmpresas', {
  empresas: [empresaSchema]
});

//Normalizacion
const holdingNormalizado = normalize(holding, cadenaEmpresasSchema);
console.log('========= Objeto Normalizado =========');
print(holdingNormalizado);

//Desnormalizar
const holdingDesnormalizado = denormalize(holdingNormalizado.result, cadenaEmpresasSchema, holdingNormalizado.entities);
console.log('========= Objeto Desnormalizado =========');
print(holdingDesnormalizado);

//Imprimir cantidades
const tamanioSinNormalizar = JSON.stringify(holding).length;
const tamanioNormalizado = JSON.stringify(holdingNormalizado).length;
const tamanioDesnormalizado = JSON.stringify(holdingDesnormalizado).length;

console.log(`Tamaño del objeto Sin Normalizar: ${tamanioSinNormalizar}`);
console.log(`Tamaño del objeto Normalizado: ${tamanioNormalizado}`);
console.log(`Tamaño del objeto Desnormalizado: ${tamanioDesnormalizado}`);

const porcentaje = (1 - (tamanioNormalizado / tamanioSinNormalizar)) * 100;

console.log(`Porcentaje de compresion: ${ porcentaje.toFixed(2) }%`);