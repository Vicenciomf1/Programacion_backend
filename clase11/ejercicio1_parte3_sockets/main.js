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

  //Imprimios la nueva conexion con su id
  console.log('¡Nuevo cliente conectado!', socket.id);

  //Guardamos la conexion en el arreglo de clientes
  clientes.push(socket);

  //Imprimimos el nunmero de clientes
  console.log('Numero de clientes: ', clientes.length);
  
  //En cada nueva conexion mandamos todos los mensajes (historial)
  socket.emit('conexion nueva', mensajes);

  //Recibimos nuevos mensajes, lo almacenamos y los mandamos a todos
  socket.on('nuevo mensaje', data => {
    //Almacenamos el nuevo mensaje y el id del remitente
    mensajes.push({
      socketid: socket.id,
      mensaje: data
    });
    //Emitimos el mensaje a todos
    clientes.forEach((cliente) => {
      cliente.emit('mensaje', 'SocketId: ' + socket.id + '-> Mensaje: ' + data);
    });
  });

  //Eliminamos los clientes que se desconectan
  socket.on('disconnect', (data) => {
    clientes.forEach((cliente, index) => {
      if (socket.id === cliente.id) {
        clientes.splice(index, 1);
        console.log(`El cliente ${socket.id} ha sido desconectado`);
      }
    });
  });
});
