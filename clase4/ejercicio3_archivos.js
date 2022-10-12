//Importamos la libreria file system
const fs = require('fs');

//Leemos el archivo package.json con la funcion asincrona con callback
const archivo = fs.readFile('clase4/package.json', 'utf-8', (error, results) => {
  if (error) {
    //Si hay error lo lanzamos
    throw new Error('Ocurrio un problema al leer el archivo');
  } else {
    //De no haber error guardamos los resultados en el objeto info
    const info = {
      contenidoStr: results,
      contenidoObj: JSON.parse(results)
    }

    //Imprimimos el objeto info
    console.log(info);

    //Mandamos a guardar el objeto info en un archivo diferente
    fs.writeFile('clase4/info.txt', JSON.stringify(info, null, 2), (error, ressults) => {
      if (error) {
        //Si hay error lo lanzamos
        throw new Error('Archivo no guardado');
      } else {
        //Si no hay error notificamos que archivo fue guardado con exito
        console.log('Archivo guardado con exito');
      }
    });
  }
  
});


