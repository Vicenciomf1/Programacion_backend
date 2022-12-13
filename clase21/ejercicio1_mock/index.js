import express from 'express';

const app = express();

const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana'];
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei'];
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta'];

const getRandom = (arr) => {
  const random = Math.floor(Math.random() * arr.length);
  return arr[random];
}

app.get('/test', (req, res) => {
  const usuarios = [];
  for ( let i = 0 ; i < 10 ; i++ ) {
    usuarios.push({
      nombre: getRandom(nombres),
      apellido: getRandom(apellidos),
      color: getRandom(colores)
    });
  }
  res.json({
    usuarios
  });
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto: ${server.address().port}`);
});