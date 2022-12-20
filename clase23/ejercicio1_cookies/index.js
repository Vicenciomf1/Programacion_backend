import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(express.json());

app.get('/cookies', (req, res) => {
  res.send(req.cookies);
});

app.post('/cookies', (req, res) => {
  const { nombre, valor, tiempo } = req.body;

  if (!nombre || !valor) {
    return res.status(400).send('Nombre o valor no especificado');
  }

  if (tiempo) {
    res.cookie(nombre, valor, { maxAge: parseInt(tiempo) });
  } else {
    res.cookie(nombre, valor);
  }

  res.send('Cookie seteada');
});

app.delete('/cookies/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  if (!nombre) {
    return res.status(400).send('Nombre no especificado');
  }

  if (!req.cookies[nombre]) {
    return res.status(404).send('Nombre no encontrado');
  }

  res.clearCookie(nombre).send(`Cookie ${nombre} eliminada`);
});

const PUERTO = 8080;
const server = app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto: ${PUERTO}`);
});