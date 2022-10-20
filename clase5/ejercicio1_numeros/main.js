//Definimos el arreglo que va a almacenar los 10000 numeros
const array = [];
//Definimos el arreglo que va a almacenar cada numero con su conteo
const object = {};

//Generamos un for que haga 10000 iteraciones para generar los numeros
for (let index = 0; index < 10000; index++) {
  //Declaramos una variable para almacenar el valor aleatorio de 1 a 20
  const value = Math.ceil(Math.random() * 20);
  //Almacenamos el valor ene l arreglo
  array.push(value);
  //Almacenamos el valor al objeto, si existe le sumamos 1, sino, se le asigna 1
  object[value] = object[value] ? object[value] + 1 : 1;
}
 
//imprimimos el objeto con su determinado conteo
console.log(object);