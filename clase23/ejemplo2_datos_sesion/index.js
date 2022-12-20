import express from "express";
import session from "express-session";

const app = express();

let contador = 0;

app.use(session({
  secret: 'cualquier_cosa',
  resave: true,
  saveUninitialized: true
}));

app.get('/con-sesion', (req, res) => {
  if (req.session.contador) {
    req.session.contador++;
    res.send(`Usted ha visitado el sitio ${req.session.contador} veces`);
  } else {
    req.session.contador = 1;
    res.send(`Bienvenido!`);
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      return res.send('Logout realizado correctamente');
    }
    res.status(500).send('Ha ocurrido un error durante el logout');
  });
});

app.get('/sin-sesion', (req, res) => {
  contador++;
  res.send(`Visitas totales sin sesion: ${contador}`);
});


const PUERTO = 8080;
const servidor = app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto: ${PUERTO}`);
});