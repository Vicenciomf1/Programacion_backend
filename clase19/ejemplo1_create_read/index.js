import mongoose from "mongoose";
import { usuarios } from "./models/usuario.js";

(async () => {
  const url = 'mongodb://localhost:27017/ecommerce';
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }); 

  console.log('CREATE');
  // 1. Definir el objeto con los campos conocidos
  const usuario = {nombre: 'Juan', apellido: 'Perez', email: 'JP@gmail.com', usuario: 'JP', password: 123456};
  // 2. Crear un "Objeto mongoose", pasando la referencia del objeto
  const usuarioSaveModel = new usuarios(usuario);
  // 3. El "Objeto mongoose" nos permite que se guarde la informacion
  const usuarioSave = await usuarioSaveModel.save();
  console.log(usuarioSave);

  console.log('READ');
  const listaUsuarios = await usuarios.find();
  console.log(listaUsuarios);

  await mongoose.disconnect();

})();