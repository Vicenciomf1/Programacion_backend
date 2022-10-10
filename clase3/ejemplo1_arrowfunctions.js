//Creando funciones

//Funcion de flecha
const miTexto = 'que tal?';
const funcionDeFlecha = (texto) => {
  return `Hola mundo! ${texto}`;
};
console.log(funcionDeFlecha(miTexto));

//Funcion un solo parametro
const funcionDeFlecha2 = texto => {
  return `Hola mundo! ${texto}`;
};
console.log(funcionDeFlecha2(miTexto));

//Funcion return implícito
const funcionDeFlecha3 = texto => `Hola mundo! ${texto}`;
console.log(funcionDeFlecha3(miTexto));


//Funcion auto invocada
((texto) => {
  console.log('Hola mundo! ' + texto)
})(miTexto);

