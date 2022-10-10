//Definicion de la funcion clousure
function conctenar(texto) {
  return function(nombre) {
    return `${texto} ${nombre}`;
  }
}

//Creando otras funciones
const saludar = conctenar('Hola');
const reganiar = conctenar('Que mal!!!');
const halagar = conctenar('Excelente!!!');

//Probando funcion saludar
console.log(saludar('Pepe'));