//Ruta de Productos************
import express from 'express';
import { Contenedor } from '../contenedor/contenedorFs.js';
const rutaCarrito = express.Router();

const carritos = new Contenedor('src/db/carritos.txt');

//Endpoints***

rutaCarrito.get('/', async (peticion, respuesta) => {
  const listaCarritos = await carritos.getAll();
  respuesta.json(listaCarritos);
});

rutaCarrito.delete('/:id', (peticion, respuesta) => {
  
});

rutaCarrito.get('/:id/productos', (peticion, respuesta) => {
  
});

rutaCarrito.post('/:id/productos', (peticion, respuesta) => {
  
});

rutaCarrito.delete('/:id/productos/:id_prod', (peticion, respuesta) => {
  
});



export { rutaCarrito };