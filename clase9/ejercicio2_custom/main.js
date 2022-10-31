const express = require('express');
const fs = require('fs');

const aplicacion = express();
const puerto = 8080;

//Nuestro motor de plantilla
aplicacion.engine('cte', (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      return callback(new Error(err));
    }
    let rendered = '';
    if (filePath.includes('plantilla1')) {
      rendered = content.toString()
        .replace('^^titulo$$', ''+ options.titulo +'')
        .replace('^^mensaje$$', ''+ options.mensaje +'')
        .replace('^^autor$$', ''+ options.autor +'')
        .replace('^^version$$', ''+ options.version +'');
    } else if (filePath.includes('plantilla2')) {
      rendered = content.toString()
        .replace('^^nombre$$', ''+ options.nombre +'')
        .replace('^^apellido$$', ''+ options.apellido +'')
        .replace('^^fecha$$', ''+ options.fecha +'');
    }
    
    return callback(null, rendered);
  });
});

aplicacion.set('view engine', 'cte'); // registra el motor de plantillas
aplicacion.set('views', './views'); // especifica el directorio de vistas

aplicacion.get('/cte1', (req, res) => {
  res.render('plantilla1', {
    titulo: 'Template software',
    mensaje: 'Hello!',
    autor: 'Coderhouse',
    version: '1.0.0'
  });
});

aplicacion.get('/cte2', (req, res) => {
  res.render('plantilla2', {
    nombre: 'Donald',
    apellido: 'Trump',
    fecha: new Date().toString()
  });
});



//***********

//Definimos el server
const servidor = aplicacion.listen(puerto, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));