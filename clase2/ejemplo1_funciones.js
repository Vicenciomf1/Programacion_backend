//Creando funciones

//Funcion ordinaria
function funcionOrdinaria(texto) {
  console.log('Hola mundo! ' + texto)
};
funcionOrdinaria('desde funcion ordinaria');

//Funcion anónima colocada en una variable
const funcionAnonima = function(texto) {
  console.log('Hola mundo! ' + texto)
};
funcionAnonima('desde funcion anonima');

//Funcion auto invocada
(function(texto) {
  console.log('Hola mundo! ' + texto)
})('desde funcion auto invocada');

