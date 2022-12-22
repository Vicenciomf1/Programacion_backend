const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

//Configuramos redis store
const RedisStore =  require("connect-redis")(session);

//Configuramos redis
const redis = require("redis");
const client = redis.createClient(15834,'redis-15834.c232.us-east-1-2.ec2.cloud.redislabs.com');

client.auth('gGun7DgpqsejadBh7F7aAnzGJm3OPiEr', (err) => {
  if (err) {console.log('err')}
});

const app = express();

app.use(cookieParser());
app.use(session({
  store: new RedisStore({
    client: client,
    ttl: 300,
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