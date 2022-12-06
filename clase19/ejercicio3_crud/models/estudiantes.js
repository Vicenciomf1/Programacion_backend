import mongoose from "mongoose";

const estudiantesCollection = 'estudiantes';
const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
  nombre: { type: String, require: true, max: 100 },
  apellido: { type: String, require: true, max: 100 },
  edad: { type: Number, require: true },
  dni: { type: String, require: true, unique: true, max: 100 },
  curso: { type: String, require: true, max: 100 },
  nota: { type: Number, require: true },
  ingreso: {type: Boolean}
});

export const estudiantes = mongoose.model(estudiantesCollection, estudianteSchema);