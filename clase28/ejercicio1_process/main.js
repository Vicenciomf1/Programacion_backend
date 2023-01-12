process.on('exit', (codigo) => {
  if (codigo) {
    return console.log(`Saliendo con codigo de error: ${codigo}`);
  }
  console.log('Saliendo ...');
});

process.on('uncaughtException', (error) => {
  console.log(error.error)

  if (error.error.descripcion == 'Entrada vacia') {
    return process.exit(-4);
  } 
  
  if (error.error.descripcion == 'Error de tipo') {
    return process.exit(-5);
  }

});

const validarArreglo = (args) => {
  if (args.length === 0) {
    throw {
      error: {
        descripcion: 'Entrada vacia'
      }
    }
  }
  args.forEach(element => {
    const num = Number(element)
    if (isNaN(num)) {
      throw {
        error: {
          descripcion: 'Error de tipo',
          numeros: args,
          tipos: args.map(n => isNaN(Number(n)) ? 'string' : 'number' )
        }
      }
    }
  });
}; 

const promedio = (args) => {
  let acumulador = 0;
  const size = args.length;
  args.forEach((num) => {
    acumulador += Number(num);
  });
  return acumulador / size;
};

const args = process.argv.slice(2);

validarArreglo(args);

const respuesta = {
  numeros: args,
  promedio: promedio(args),
  max: Math.max(...args),
  min: Math.min(...args),
  ejecutable: process.execPath.split('/').pop(),
  pid: process.pid
};

console.log(respuesta);