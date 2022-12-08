import mongoose from 'mongoose';

const userCollection = 'usuarios';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombre: { type: String },
  apellido: {type: String},
  dni: {type: String, unique: true}
});

export const usuarioModel = mongoose.model(userCollection, userSchema);