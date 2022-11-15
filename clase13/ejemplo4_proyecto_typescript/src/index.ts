import * as operaciones from './lib/operaciones';

const mensaje: string = 'Hola! typescript!';
console.log(mensaje);

const num1: number = 2, num2: number = 3;
console.log(`${num1} + ${num2} = ${operaciones.sumar(num1, num2)}`);
console.log(`${num1} - ${num2} = ${operaciones.restar(num1, num2)}`);
console.log(`${num1} * ${num2} = ${operaciones.mult(num1, num2)}`);
console.log(`${num1} / ${num2} = ${operaciones.div(num1, num2)}`);
