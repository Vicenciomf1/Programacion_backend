import express from 'express';
import faker from 'faker';
faker.locale = 'es';

const app = express();

app.get('/test', (req, res) => {
  const cantidad = parseInt(req.query.cant) || 10;
  const usuarios = [];
  for ( let i = 0 ; i < cantidad ; i++ ) {
    usuarios.push({
      id: i + 1,
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      color: faker.commerce.color()
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