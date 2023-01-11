import mongoose from "mongoose";

const modeloUsuario = mongoose.model('Users', {
  username: String,
  password: String,
  email: String,
});

export { modeloUsuario };