//Creando clase contador
class Contador {
  //Definiendo constructor
  constructor(responsable) {
    this.responsable = responsable;
    this.cuentaIndividual = 0;
  }

  //Definiendo variable estatica
  static cuentaGlobal = 0;

  //Definiendo métodos
  obtenerResponsable() {
    return this.responsable;
  }

  obtenerCuentaIndividual() {
    return this.cuentaIndividual;
  }

  obtenerCuentaGlobal() {
    return Contador.cuentaGlobal;
  }

  contar() {
    this.cuentaIndividual++;
    Contador.cuentaGlobal++;
  }

}

//Creando instancia
const pepe = new Contador('Pepe');
const pedro = new Contador('Pedro');

//Probando método de contar
pepe.contar();
pedro.contar();

//Probando métodos para obtener resultados
console.log(pepe.obtenerResponsable());
console.log(pepe.obtenerCuentaIndividual());
console.log(pepe.obtenerCuentaGlobal());