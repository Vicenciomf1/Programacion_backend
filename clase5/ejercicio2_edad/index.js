//Importamos la libreria
const moment = require('moment');

//Definimos la fecha de nuestra edad y del dia de hoy
const edad = moment(new Date('02/27/1995'));
const hoy = moment(new Date());

//Usamos la funcion para calcular la diferencia entre las dos fechas
//La respuesta es en milisegundos
const diferencia = hoy.diff(edad);

//Usamos la funcion duracion, para instanciar una nueva duracion
//Le pasamos los milisegundos como parametro
const duracion = moment.duration(diferencia);

//Procedemos a calcular los dias y los anios
//Usando sus respectivas funciones en la duration, as years y as days
//Usamos Math.floor para tomar el valor entero inferior
const anios = Math.floor(duracion.asYears());
const dias = Math.floor(duracion.asDays());

//Formateamos las fechas
const edadFormateada = edad.format('DD/MM/yyyy');
const hoyFormateado = hoy.format('DD/MM/yyyy');

//Procedemos a imprimir el resultado
console.log(`Hoy es ${hoyFormateado}`);
console.log(`Nací el ${edadFormateada}`);
console.log(`Desde mi nacimiento han pasado ${anios} años.`);
console.log(`Desde mi nacimiento han pasado ${dias} dias.`);
