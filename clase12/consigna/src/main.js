//Servidor************
const express = require('express');
const aplicacion = express();
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Contenedor = require('./contenedor/contenedorFs');

const port = 8080;
const publicRoot = './public';

//Lineas para usar json
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

const httpServer = new HttpServer(aplicacion);
const io = new IOServer(httpServer);

//***** Hacemos la carpeta public visible
aplicacion.use(express.static(publicRoot));
//****************

const productos = new Contenedor('./src/db/productos.txt');

//Endpoints***

aplicacion.get('/', (peticion, respuesta) => {
  respuesta.send('index.html', { root: publicRoot });
});

//***********


//Servidor************
const servidor = httpServer.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));
//****************


//Sockets************
io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado!');

  const listaProductos = await productos.getAll();
  socket.emit('nueva-conexion', listaProductos);

  socket.on("new-product", (data) => {
    productos.save(data);
    io.sockets.emit('producto', data);
  });
});
//****************