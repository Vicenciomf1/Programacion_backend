const express = require("express");
const ExpressHandlebars = require("express-handlebars");
const session = require("express-session");

const passport = require("passport");
const {Strategy: FacebookStrategy} = require('passport-facebook');

const app = express();

const PORT = 8080;

//Credenciales

const FACEBOOK_CLIENT_ID = '3473973992926019';
const FACEBOOK_CLIENT_SECRET = '235cfaf6532e183a0f2f36bef29fff0e';

//Configurar funciones passport

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'email'],
  scope: ['email'],
}, (accessToken, refreshToken, userProfile, done) => {
  return done(null, userProfile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
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

app.get('/loginError', (req, res) => {
  res.sendFile(__dirname + '/views/login-error.html');
});

app.get('/registerError', (req, res) => {
  res.sendFile(__dirname + '/views/register-error.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

//Endpoints para facebook
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/loginError'
}));

app.post('/login', passport.authenticate('login', { failureRedirect: '/loginError', successRedirect: '/datos' }));


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
      nombre: req.user.displayName,
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