//Declaramos la funcion de mostrar letras, recibe texto y callback
const mostrarLetras = (texto, callback) => {
  //Inicializamos un contador
  let contador = 0;

  //Inicializamos un set interval que imprimira las letras
  let interval = setInterval(() => {
    //Imprimimos la letra actual dependiendo del contador
    console.log(texto[contador]);
    //Sumamos el contador despues de cada ejecucion
    //Para que en la siguiente ejecucion se muestre la siguiente letra
    contador++;
    //Si el valor de contador supera el tamaño del texto, el set interval termina
    if(contador == texto.length){
      //Lanzamos el callback al terminar
      callback();
      //Cerramos el interval
      clearInterval(interval);
    }
  }, 250, texto)
};

//Definimos nuestra funcion callback
const fin = () => console.log('terminé')

//Invocamos la funcion principal
mostrarLetras('ksantoo', fin);