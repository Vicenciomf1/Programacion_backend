const socket = io();

//Escuchar el servidor para recibir mensajes
socket.on('mi mensaje', data => {
  document.getElementById('mensaje').innerHTML = data;
})

//Funcion para enviar mensajes
function addMessage(e) {
  const mensaje = document.getElementById('texto').value;
  console.log(mensaje);
  socket.emit('nuevo mensaje', mensaje);
  return false;
} 