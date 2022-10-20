//Definimos la clase de productos
class Productos {

  //Definimos constructor
  constructor(productos) {
    //Asignamos los productos al construir
    this.productos = productos;
  }

  //Definimos funcion para obtener los nombres separados por coma
  getNombresProductos = () => {
    //Definimos la variable que va a almacenar la lista de nombres
    const array = [];
    //Recorremos todos los items para almacenar sus nombres en el arreglo
    this.productos.forEach((item, index) => {
      array.push(item.nombre);
    });
    //Retornamos el arreglo y usamos la funcion join para convertir el arreglo a texto
    return array.join(', ');
  };

  //Definimos funcion para obtener los totales
  getTotal = () => {
    //Definimos acumulador
    let suma = 0;
    //Recorremos todos los items para sumar todos los precios en el acumulador
    this.productos.forEach((item, index) => {
      suma += item.precio;
    }); 
    //Retornamos acumulador
    return suma;
  };

  //Definimos funcion para obtener el menor precio
  getMenorPrecio = () => {
    //Definimos variable que almacenará el precio menor
    let menor = 0;
    //Recorremos todos los items para obtener el precio menor
    this.productos.forEach((item, index) => {
      if(menor == 0){
        menor = item.precio;
      }
      if (menor > item.precio) {
        menor = item.precio;
      }
    });
    //Retornamos el precio menor
    return menor;
  };

  //Definimos funcion para obtener el mayor precio
  getMayorPrecio = () => {
    //Definimos variable que almacenará el precio mayor
    let mayor = 0;
    //Recorremos todos los items para obtener el precio mayor
    this.productos.forEach((item, index) => {
      if (mayor < item.precio) {
        mayor = item.precio;
      }
    });
    //Retornamos el precio mayor
    return mayor;
  };
};

//Definimos la lista de ejemplo
const listaProductos = [
  { id:1, nombre:'Escuadra', precio:323.45 },
  { id:2, nombre:'Calculadora', precio:234.56 },
  { id:3, nombre:'Globo Terráqueo', precio:45.67 },
  { id:4, nombre:'Paleta Pintura', precio:456.78 },
  { id:5, nombre:'Reloj', precio:67.89 },
  { id:6, nombre:'Agenda', precio:78.90 }
];

//Creamos una instancia a partir de la lista de ejemplo
const productos = new Productos(listaProductos);

//Probamos los métodos definidos
console.log(productos.getNombresProductos());
console.log(productos.getTotal());
console.log(productos.getMayorPrecio());
console.log(productos.getMenorPrecio());