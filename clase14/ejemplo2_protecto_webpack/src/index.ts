import express from "express";
import Persona from "./Persona";
import { getTime } from "./lib/utils";

const persona: Persona = new Persona('Coder', 'House');

const app = express();

app.get('/', (req, res) => {
  res.send({
    time: getTime(),
    name: persona.getFullName()
  });
});

const server = app.listen(8080, () => {
  console.log(`Servidor escuchando en 8080`);
});