const operacion = (valor1, valor2, callback) => {
  return callback(valor1, valor2);
};

const suma = (valor1, valor2) => valor1 + valor2;
const resta = (valor1, valor2) => valor1 - valor2;
const multiplicacion = (valor1, valor2) => valor1 * valor2;
const division = (valor1, valor2) => valor1 / valor2;

const resultado = operacion(2, 3, division);
console.log(resultado);