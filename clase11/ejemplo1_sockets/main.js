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
httpServer.listen(3000, () => console.log('SERVER ON'))

io.on('connection', (cliente) => {
// "connection" se ejecuta la primera vez que se abre una nueva conexión
  console.log('Usuario conectado');
  // Se imprimirá solo la primera vez que se ha abierto la conexión    
  cliente.emit('mi mensaje', 'Este es mi mensaje desde el servidor');
  cliente.on('notificacion', data => {
    console.log('Mensaje recibido del cliente: ', data);
  });
});
