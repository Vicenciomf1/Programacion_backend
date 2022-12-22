const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

//Configuramos redis store
const MongoStore =  require("connect-mongo");

//Configuramos redis
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const app = express();

app.use(cookieParser());
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://root:root@cluster0.7yey2qr.mongodb.net/sesiones?retryWrites=true&w=majority',
    mongoOptions: advancedOptions,
    ttl: 600
  }),
  secret: 'cualquier_cosa',
  resave: false,
  saveUninitialized: false
}));

const auth = (req, res, next) => {
  if (req.session.nombre == 'Juan') {
    return next();
  }
  return res.status(401).send('Acceso no autorizado.');
}

app.get('/root', (req, res) => {
  const nombre = req.query.nombre;

  if (!nombre) {
    return res.status(400).send('Nombre no especificado');
  }

  if (req.session.contador) {
    req.session.contador++;
    res.send(`${nombre}, has visitado el sitio ${req.session.contador} veces`);
  } else {
    req.session.nombre = nombre;
    req.session.contador = 1;
    res.send(`Bienvenido ${nombre}!`);
  }
});

app.get('/rootAdmin', auth, (req, res) => {
  const nombre = req.query.nombre;

  if (!nombre) {
    return res.status(400).send('Nombre no especificado');
  }

  if (req.session.contador) {
    req.session.contador++;
    res.send(`${nombre}, has visitado el sitio ${req.session.contador} veces`);
  } else {
    req.session.nombre = nombre;
    req.session.contador = 1;
    res.send(`Bienvenido ${nombre}!`);
  }
});

app.get('/olvidar', (req, res) => {
  const nombre = req.session.nombre;
  if (!nombre) {
    return res.send(`Logout ya efectuado anteriormente`);
  }
  req.session.destroy((err) => {
    if (!err) {
      return res.send(`Hasta luego ${nombre}`);
    }
    res.status(500).json({
      error: 'Ha ocurrido un error durante el logout'
    });
  });
});

const PUERTO = 8080;
const servidor = app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto: ${PUERTO}`);
});