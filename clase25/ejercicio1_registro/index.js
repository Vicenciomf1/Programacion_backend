// import express from "express";
// import ExpressHandlebars from "express-handlebars";
// import session from "express-session";
const express = require("express");
const ExpressHandlebars = require("express-handlebars");
const session = require("express-session");

const app = express();

const PORT = 8080;

//Middleware - Configuraciones

const usuarios = [];

app.use(session({
  secret: 'kjbdfksbdfkysdbfsdf',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000,
  }
}));

app.use(express.urlencoded({extended:true}))

app.engine('.hbs', ExpressHandlebars({
  extname: '.hbs',
  defaultLayout: 'main.hbs'
}));

app.set('view engine', '.hbs');

app.use(express.json());

//Rutas

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/views/register.html');
});

app.post('/register', (req, res) => {
  const { username, password, direccion } = req.body;

  const usuario = usuarios.find((usuario) => usuario.username == username);
  if (usuario) {
    return res.sendFile(__dirname + '/views/register-error.html');
  }

  usuarios.push({ username, password, direccion });
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const usuario = usuarios.find((usuario) => usuario.username == username && usuario.password == password);
  if (!usuario) {
    return res.sendFile(__dirname + '/views/login-error.html');
  }

  req.session.nombre = username;
  req.session.direccion = usuario.direccion;
  req.session.contador = 0;
  //redireccionar a la pagina principal
  res.redirect('/datos');
});

app.get('/', (req, res) => {
  if (req.session.nombre) {
    res.redirect('/datos');
  } else {
    res.redirect('/login');
  }
});

app.get('/datos', (req, res) => {
  if (req.session.nombre) {
    res.render('datos', {
      nombre: req.session.nombre,
      direccion: req.session.direccion,
    });
  } else {
    res.redirect('/login');
  }
});

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${PORT}`);
});