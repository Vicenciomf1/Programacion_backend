import faker from 'faker';
faker.locale = 'es';

import fs from 'fs';

const { name, internet, random } = faker;

let str = 'NOMBRE;APELLIDO;EMAIL;TRABAJO;LUGAR\n';

for (let index = 0; index < 100; index++) {
  str += name.firstName() + ';' +
  name.lastName() + ';' +
  internet.email() + ';' +
  name.jobTitle() + ';' +
  random.locale() + '\n';
}

fs.writeFile('./test.csv',str, err => {
  if (err) {
    console.log('Hubo un error');
  } else {
    console.log('Archivo guardado con exito');
  }
})