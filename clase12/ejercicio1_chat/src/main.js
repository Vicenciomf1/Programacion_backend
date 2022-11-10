//Importamos librerias
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

//Configuracion
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//Variables
const port = 8080;
const publicRoot = './public';
const messages = [
  { author: "Juan", text: "¡Hola! ¿Que tal?" },
  { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
  { author: "Ana", text: "¡Genial!" }
];

//Haremos visible la carpeta public
app.use(express.static(publicRoot));

//Levantamos el servidor
httpServer.listen(port, function() {
  console.log('Servidor corriendo en http://localhost:8080');
});

//Definicion de sockets
io.on('connection', function(socket) {
  console.log('Un cliente se ha conectado');

  //Para enviar todos los mensajes en la primera conexion
  socket.emit('messages', messages);

  //Evento para recibir nuevos mensajes
  socket.on('new-message',data => {
    messages.push(data);
    io.sockets.emit('messages', messages);
  });
});
