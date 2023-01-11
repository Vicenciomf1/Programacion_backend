const express = require("express");
const ExpressHandlebars = require("express-handlebars");
const jwt = require("jsonwebtoken");

const app = express();

const PORT = 8080;
const PRIVATE_KEY = "myprivatekey123";

//Middleware - Configuraciones

const usuarios = [];

app.use(express.urlencoded({extended:true}))

app.engine('.hbs', ExpressHandlebars({
  extname: '.hbs',
  defaultLayout: 'main.hbs'
}));

app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.static('public'));

// Middleware y funciones jwt

const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "60s" });
  return token;
};

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"] || '';
  if (!authHeader) {
    return res.status(401).json({
      error: "Token no encontrado"
    });
  }
  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, PRIVATE_KEY);
    req.user = user.user;
    req.isAuthenticated = true;
    next();
  } catch (error) {
    return res.status(403).json({
      error: 'Token no válido'
    });
  }
};

//Rutas

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
});

app.post('/register', (req, res) => {
  const { username, password, direccion } = req.body;

  const usuario = usuarios.find((usuario) => usuario.username == username);
  if (usuario) {
    return res.status(409).json({error: "usuario ya existe"});
  }

  const contador = 0;
  const newUser = { username, password, direccion, contador };
  usuarios.push(newUser);

  const access_token = generateToken(newUser);
  res.json({ access_token });
});

app.get('/login-error', (req, res) => {
  res.sendFile(__dirname + '/public/noAutorizado.html');
});

app.get('/register-error', (req, res) => {
  res.sendFile(__dirname + '/public/noAutorizado.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const usuario = usuarios.find((usuario) => usuario.username == username && usuario.password == password);
  if (!usuario) {
    return res.status(404).json({error: "usuario no encontrado"});
  }

  const access_token = generateToken(usuario);
  res.json({ access_token });
});

app.get('/datos', auth, (req, res) => {
  if (req.isAuthenticated) {
    const usuario = usuarios.find((usuario) => usuario.username == req.user.username);
    usuario.contador++;
    res.json({
      datos: usuario,
    });
  } else {
    return res.status(404).json({error: "usuario no encontrado"});
  }
});

app.get('/logout', (req, res) => {
 req.logout(() => {});
 res.redirect('/');
});

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${PORT}`);
});