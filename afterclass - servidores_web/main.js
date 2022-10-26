const fs = require('fs');

//Servidor************
const express = require('express');
const aplicacion = express();
const port = 8080;
//****************

class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
  }

  async save(objeto) {
    const archivo = await fs.promises.readFile(this.nombre, 'utf-8');
    const archivoParseado = JSON.parse(archivo);
    let id = 1;
    archivoParseado.forEach((element, index) => {
      if (element.id >= id) {
        id = element.id + 1;
      }
    });
    objeto.id = id;
    archivoParseado.push(objeto);
    await fs.promises.writeFile(this.nombre, JSON.stringify(archivoParseado, null, 2));
    return id;
  }

  async getById(id) {
    const archivo = await fs.promises.readFile(this.nombre, 'utf-8');
    const archivoParseado = JSON.parse(archivo);
    let objetoSeleccionado = null;
    archivoParseado.forEach(element => {
      if (element.id == id) {
        objetoSeleccionado = element;
      }
    });
    return objetoSeleccionado;
  }

  async getAll() {
    const archivo = await fs.promises.readFile(this.nombre, 'utf-8');
    const archivoParseado = JSON.parse(archivo);
    return archivoParseado;
  }

  async deleteById(id) {
    const archivo = await fs.promises.readFile(this.nombre, 'utf-8');
    const archivoParseado = JSON.parse(archivo);
    let indexSeleccionado = -1;
    archivoParseado.forEach((element, index) => {
      if (element.id == id) {
        indexSeleccionado = index;
      }
    });
    if (indexSeleccionado != -1) {
      archivoParseado.splice(indexSeleccionado, 1);
      await fs.promises.writeFile(this.nombre, JSON.stringify(archivoParseado, null, 2));
    }
    
  }

  async deleteAll() {
    const arregloVacio = [];
    await fs.promises.writeFile(this.nombre, JSON.stringify(arregloVacio, null, 2));
  }
}

const implementacion = async () => {
  // const lista = new Contenedor('productos.txt');
};

const lista = new Contenedor('productos.txt');

//Endpoints***

aplicacion.get('/productos', async (peticion, respuesta) => {
  const all = await lista.getAll();
  respuesta.json(all);
});

aplicacion.get('/indiceRandom', async (peticion, respuesta) => {

  const all = await lista.getAll();
  const random = Math.floor(Math.random() * all.length);
  //Llamado a la funcion para obtener el id
  respuesta.json({
    random: random
  });
});

//***********


//Servidor************
const servidor = aplicacion.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));
//****************