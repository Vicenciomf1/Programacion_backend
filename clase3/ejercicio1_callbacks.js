
const operacion = (valor1, valor2, callback) => callback(valor1, valor2);

const suma = (valor1, valor2) => valor1 + valor2;
const resta = (valor1, valor2) => valor1 - valor2;
const multiplicacion = (valor1, valor2) => valor1 * valor2;
const division = (valor1, valor2) => valor1 / valor2;
const modulo = (valor1, valor2) => valor1 % valor2;

console.log(operacion(2, 3, suma));
console.log(operacion(2, 3, resta));
console.log(operacion(2, 3, multiplicacion));
console.log(operacion(2, 3, division));
console.log(operacion(2, 3, modulo));