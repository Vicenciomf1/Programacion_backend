//Importacion de librerias
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

//Inicializacion de la configuracion
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//Servimos nuestra carpeta public
app.use(express.static(__dirname + '/public'));

//Endpoints

//Servimos en la raiz el index.html
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/public'});
});

// El servidor funcionando en el puerto 3000
httpServer.listen(3000, () => console.log('SERVER ON'));

const clientes = [];
const mensajes = [];

io.on('connection', (socket) => {
// "connection" se ejecuta la primera vez que se abre una nueva conexión
  console.log('¡Nuevo cliente conectado!', socket.id);
  clientes.push(socket);
  console.log('Numero de clientes: ', clientes.length);
  // Se imprimirá solo la primera vez que se ha abierto la conexión
  socket.on('nuevo mensaje', data => {
    clientes.forEach((cliente) => {
      cliente.emit('mi mensaje', data);
    });
  });

  socket.on('disconnect', (data) => {
    clientes.forEach((cliente, index) => {
      if (socket.id === cliente.id) {
        clientes.splice(index, 1);
        console.log(`El cliente ${socket.id} ha sido desconectado`);
      }
    });
  });
});
