import express from "express";
import cookieParser from "cookie-parser";

const app = express();

const secret = 'uny742nuhn7c2j#$%#$chdi3';

app.use(cookieParser(secret));

app.get('/set', (req, res) => {
  res.cookie('server', 'express').send('Cookie seteada');
});

app.get('/setEX', (req, res) => {
  res.cookie('server_temeporal', 'express_temporal', { maxAge: 100000 }).send('Cookie temporal seteada');
});

app.get('/setSigned', (req, res) => {
  res.cookie('server_encriptado', 'express_encriptado', { signed: true }).send('Cookie encriptada seteada');
});

app.get('/get', (req, res) => {
  res.send({
    noEncriptadas: req.cookies,
    encriptadas: req.signedCookies
  });
});

app.get('/clr', (req, res) => {
  res.clearCookie('server').send('Cookie eliminada');
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${PORT}`);
});