import mongoose from "mongoose";

const usuarioCollection = 'usuarios';
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre: { type: String, require: true, max: 100 },
  apellido: { type: String, require: true, max: 100 },
  email: { type: String, require: true, max: 100 },
  usuario: { type: String, require: true, max: 100 },
  password: { type: Number, require: true }
});

export const usuarios = mongoose.model(usuarioCollection, usuarioSchema);