const express = require("express");
const ExpressHandlebars = require("express-handlebars");
const session = require("express-session");

const passport = require("passport");
const {Strategy: LocalStrategy} = require('passport-local');

const app = express();

const PORT = 8080;

//Configurar funciones passport

passport.use('register', new LocalStrategy({
  passReqToCallback: true
}, (req, username, password, done) => {
  const {direccion} = req.body;

  const usuario = usuarios.find((usuario) => usuario.username == username);
  if (usuario) {
    return done(null, false);
  }
  const user = { username, password, direccion };
  usuarios.push(user);
  return done(null, user);
} ));

passport.use('login', new LocalStrategy((username, password, done) => {
  const usuario = usuarios.find((usuario) => usuario.username == username && usuario.password == password);
  if (!usuario) {
    return done(null, false);
  }

  usuario.contador = 0;
  //redireccionar a la pagina principal
  return done(null, usuario);
}));

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  const usuario = usuarios.find(usuario => usuario.username == username);
  done(null, usuario);
});

app.use(session({
  secret: 'kjbdfksbdfkysdbfsdf',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

//Middleware - Configuraciones

const usuarios = [];



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

app.post('/register', passport.authenticate('register', { failureRedirect: 'registerError', successRedirect: '/' }));

// app.post('/register', (req, res) => {
//   const { username, password, direccion } = req.body;

//   const usuario = usuarios.find((usuario) => usuario.username == username);
//   if (usuario) {
//     return res.sendFile(__dirname + '/views/register-error.html');
//   }

//   usuarios.push({ username, password, direccion });
//   res.redirect('/login');
// });

app.get('/loginError', (req, res) => {
  res.sendFile(__dirname + '/views/login-error.html');
});

app.get('/registerError', (req, res) => {
  res.sendFile(__dirname + '/views/register-error.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', passport.authenticate('login', { failureRedirect: '/loginError', successRedirect: '/datos' }));

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   const usuario = usuarios.find((usuario) => usuario.username == username && usuario.password == password);
//   if (!usuario) {
//     return res.sendFile(__dirname + '/views/login-error.html');
//   }

//   req.session.nombre = username;
//   req.session.direccion = usuario.direccion;
//   req.session.contador = 0;
//   //redireccionar a la pagina principal
//   res.redirect('/datos');
// });

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/datos');
  } else {
    res.redirect('/login');
  }
});

app.get('/datos', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('datos', {
      nombre: req.user.username,
      direccion: req.user.direccion,
    });
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
 req.logout(() => {});
 res.redirect('/');
});

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${PORT}`);
});