import mongoose from 'mongoose';
import { usuarioModel } from './schemas/usuario.js';

( async () => {
  try {
    await mongoose.connect('mongodb+srv://root:root@cluster0.7yey2qr.mongodb.net/ecommerce?retryWrites=true&w=majority', {
      serverSelectionTimeoutMS: 5000,
    });

    const nuevoUsuario = {nombre: 'Federico', apellido: 'Perez', dni: '320118321'}; 
    const usuarioSave = new usuarioModel(nuevoUsuario);
    await usuarioSave.save();
    
    const usuarios = await usuarioModel.find();
    console.log(usuarios);
  } catch (error) {
    console.log(error);
  }
})();
