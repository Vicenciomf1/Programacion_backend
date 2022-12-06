const mongoose = require('mongoose');
const estudiantes = require('./models/estudiantes');

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
    });
  });
  console.table(array);
};

const errorHandler = (error) => {
  console.log(`Ocurrio un error al leer los registros: ${error}`);
};

const url = 'mongodb://localhost:27017/colegio';
mongoose.set('strictQuery', true);
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  //Consultas-----------------------
  estudiantes.find({}).sort({ nombre: 1 })
  .then((resultado) => {
    console.log('Los estudiantes ordenados por orden alfabético según sus nombres.');
    print(resultado);

    estudiantes.find({}).sort({ edad: 1 }).limit(1)
    .then((resultado) => {
      console.log('El estudiante más joven.');
      print(resultado);

      estudiantes.find({}).where({ curso: '2A' })
      .then((resultado) => {
        console.log(`Los estudiantes que pertenezcan al curso '2A'.`);
        print(resultado);

        estudiantes.find({}).sort({ edad: 1 }).limit(1).skip(1)
        .then((resultado) => {
          console.log(`El segundo estudiante más joven.`);
          print(resultado);

          estudiantes.find({}, { nombre: 1, apellido: 1, curso: 1}).sort({ apellido: -1 })
          .then((resultado) => {
            console.log(`Sólo los nombres y apellidos de los estudiantes con su curso correspondiente, ordenados por apellido descendente (z a a).`);
            print(resultado);

            estudiantes.find({}).where({ nota: 10 })
            .then((resultado) => {
              console.log(`Los estudiantes que sacaron 10.`);
              print(resultado);

              estudiantes.find({})
              .then((resultado) => {
                let acumulador = 0;
                resultado.forEach((estudiante) => {
                  acumulador += estudiante.nota;
                });
                const promedio = acumulador / resultado.length;
                console.log(`El promedio de notas del total de alumnos: ${promedio}`);

                estudiantes.find({}).where({ curso: '1A' })
                .then((resultado) => {
                  let acumulador = 0;
                  resultado.forEach((estudiante) => {
                    acumulador += estudiante.nota;
                  });
                  const promedio = acumulador / resultado.length;
                  console.log(`El promedio de notas del curso '1A': ${promedio}`);
                })
                .catch(errorHandler);

              })
              .catch(errorHandler);

            })
            .catch(errorHandler);

          })
          .catch(errorHandler);

        })
        .catch(errorHandler);

      })
      .catch(errorHandler);

    })
    .catch(errorHandler);

  })
  .catch(errorHandler);

})
.catch((error) => console.log(error)); 