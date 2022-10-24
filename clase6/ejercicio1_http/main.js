//Importamos las librerias
const http = require('http');
const moment = require('moment');

//Definimos la funcion de escucha del servidor
const servidor = http.createServer((peticion, respuesta) => {
  //Definimos el dia y hora
  const ahora = moment(new Date());
  //Obtenemos la hora
  const hora = ahora.hours();
  //En base a la hora decidimos que mensaje
  if (hora >= 6 && hora <= 12) {
    respuesta.end('Buenos dias!');
  } else if(hora >= 13 && hora <= 19) {
    respuesta.end('Buenas tardes!');
  } else if(hora >= 20 && hora <= 5) {
    respuesta.end('Buenas noches!');
  }
});

//Establecemos la conexion del servidor
const conexionServidor = servidor.listen(8080, () => {
  console.log(`Servidor Http escuchando en el puerto ${conexionServidor.address().port}`)
});