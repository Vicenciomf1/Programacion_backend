//Servidor************
const express = require('express');
const { Router } = express;
const aplicacion = express();

const rutaProductos = Router();

const port = 8080;

//***** Hacemos la carpeta public visible
aplicacion.use('/static', express.static(__dirname + '/public'));
//****************

class Contenedor {
  constructor(productos) {
    this.productos = productos;
  }

  save(objeto) {
    let id = 1;
    this.productos.forEach((element, index) => {
      if (element.id >= id) {
        id = element.id + 1;
      }
    });
    objeto.id = id;
    this.productos.push(objeto);
    return id;
  }

  getById(id) {
    let objetoSeleccionado = null;
    this.productos.forEach(element => {
      if (element.id == id) {
        objetoSeleccionado = element;
      }
    });
    return objetoSeleccionado;
  }

  getAll() {
    return this.productos;
  }

  deleteById(id) {
    let indexSeleccionado = -1;
    this.productos.forEach((element, index) => {
      if (element.id == id) {
        indexSeleccionado = index;
      }
    });
    if (indexSeleccionado != -1) {
      this.productos.splice(indexSeleccionado, 1);
    }
    
  }

  deleteAll() {
    this.productos = [];
  }
}

const productos = new Contenedor([]);

//Datos de prueba
productos.save({
  title: 'PC',
  price: '4000',
  thumbnail: 'image1'
});

productos.save({
  title: 'Teclado',
  price: '400',
  thumbnail: 'image2'
});

//Endpoints***

//Get by id
rutaProductos.get('/:id', (peticion, respuesta) => {
  const id = parseInt(peticion.params.id);
  const producto = productos.getById(id);
  if (producto) {
    respuesta.json(producto);
  } else {
    respuesta.status(404);
    respuesta.json({ error : 'producto no encontrado' });
  }
  
});

rutaProductos.get('/', (peticion, respuesta) => {
  const listaProductos = productos.getAll();
  respuesta.json(listaProductos);
});

rutaProductos.post('/', (peticion, respuesta) => {
});

rutaProductos.put('/:id', (peticion, respuesta) => {
});

rutaProductos.delete('/:id', (peticion, respuesta) => {
});

aplicacion.use('/api/productos', rutaProductos);

//***********


//Servidor************
const servidor = aplicacion.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));
//****************