const { application } = require('express');
const express = require('express');
const handlebars = require('express-handlebars');

const aplicacion = express();
const puerto = 8080;

//Nuestro motor de plantilla
aplicacion.engine('hbs', handlebars.engine({
  extname: '.hbs',
  defaultLayout: 'index.hbs',
  layoutsDir: __dirname + '/views'
}));

aplicacion.set('view engine', 'hbs'); // registra el motor de plantillas
aplicacion.set('views', './views'); // especifica el directorio de vistas

aplicacion.get('/', (req, res) => {
  res.render('main', {
    nombre: 'Donald',
    apellido: 'Trump',
    edad: '76',
    email: 'donald.trump@gmail.com',
    telefono: '55555555'
  });
});

//***********

//Definimos el server
const servidor = aplicacion.listen(puerto, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));