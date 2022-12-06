import mongoose from "mongoose";
import { estudiantes } from "./models/estudiantes.js";

//Codigo para imprimir
const print = (data) => {
  let array = [];
  data.forEach((estudiante) => {
    array.push({
      nombre: estudiante.nombre || '',
      apellido: estudiante.apellido || '',
      edad: estudiante.edad || '',
      dni: estudiante.dni || '',
      curso: estudiante.curso || '',
      nota: estudiante.nota || '',
      ingreso: estudiante.ingreso,
      fechaCreacion: estudiante._id.getTimestamp()
    });
  });
  console.table(array);
};

(async () => {
  const url = 'mongodb://localhost:27017/colegio';
  mongoose.set('strictQuery', true);
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  //Instrucciones
  await estudiantes.updateOne({ nombre: 'Lucas', apellido: 'Blanco' },{
    $set: {
      dni: 20355875
    }
  });

  await estudiantes.updateMany({}, {
    $set: {
      ingreso: false
    }
  });

  await estudiantes.updateMany({ curso: '1A' }, {
    $set: {
      ingreso: true
    }
  });

  let listaEstudiantes = await estudiantes.find({}).where({ nota: { $gte: 4 } });
  print(listaEstudiantes);

  listaEstudiantes = await estudiantes.find({}).where({ ingreso: true });
  print(listaEstudiantes);

  await estudiantes.deleteMany({ ingreso: true });

  listaEstudiantes = await estudiantes.find({});
  print(listaEstudiantes);

  await mongoose.disconnect();

})()

