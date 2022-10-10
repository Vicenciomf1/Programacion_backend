//1. Funcion de lista
function mostrarLista(lista) {
  if(lista.length === 0) {
    return 'Lista vacía';
  }
  return lista;
}
console.log('1- Funcion de lista -------------------');
console.log(mostrarLista([]));
console.log(mostrarLista([1]));
console.log('---------------------------------------');

// 2. Funcion anonima

(function(lista) {
  console.log('2- Funcion anonima -------------------');
  if(lista.length === 0) {
    console.log('Lista vacía');
  } else {
    console.log(lista);
  }
  console.log('---------------------------------------');
})([4,5,6]);

//3. Multiplicador

function multiplicador(num1) {
  return function(num2) {
    return num1 * num2;
  };
}
console.log('3- Multiplicador -------------------');

const duplicar = multiplicador(2);
const triplicar = multiplicador(3);

console.log(duplicar(5));
console.log(triplicar(5));

console.log('---------------------------------------');