const socket = io();

//Escuchar el servidor para recibir mensajes nuevos
socket.on('mensaje', data => {
  const mensaje = document.createElement('p');
  mensaje.innerHTML = data;
  document.getElementById('mensajes').appendChild(mensaje);
})

//Escuchar el servidor para recibir todo el historial en nuestra primera conexion
socket.on('conexion nueva', data => {
  data.forEach(element => {
    const mensaje = document.createElement('p');
    mensaje.innerHTML = 'SocketId: ' + element.socketid + ' -> Mensaje: ' + element.mensaje;
    document.getElementById('mensajes').appendChild(mensaje);
  });
})

//Funcion para enviar mensajes
function addMessage() {
  const mensaje = document.getElementById('texto').value;
  console.log(mensaje);
  socket.emit('nuevo mensaje', mensaje);
} 