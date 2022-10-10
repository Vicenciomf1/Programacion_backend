//Definiendo clase
class Carro {
  //Definiendo constructor
  constructor(marca, modelo, color) {
    this.marca = marca;
    this.modelo = modelo;
    this.color = color;
  }
  //Definiendo variable estatica
  static pais = 'Arg';

  //Definiendo métodos
  tocarBocina (intensidad) {
    return `Beeep ${intensidad}!!!! desde el ${this.marca} ${this.modelo} ${this.color}` ;
  }

  pintar (colorNuevo) {
    this.color = colorNuevo;
  }

  cambiarPaisDeTodosLosCarros (paisNuevo) {
    Carro.pais = paisNuevo;
  }

}

//Creando instancias
const mustang = new Carro('Ford', 'Mustang', 'blanco');
const explorer = new Carro('Ford', 'Explorer', 'negro');

//Probando métodos de las instancias
//Cambiando país de todos los carros
mustang.cambiarPaisDeTodosLosCarros('Hn');

//Imprimiendo instancias (Carros)
console.log(mustang);
console.log(explorer);

//Cambiando país de todos los carros, directamente
Carro.pais = 'Mx';
console.log(Carro.pais);

//Probando funcion de tocar bocina en cada carro
console.log(mustang.tocarBocina('suave'));
console.log(explorer.tocarBocina('fuerte'));