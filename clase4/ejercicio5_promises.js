
const fs = require('fs');

const funcion = async () => {

  try {
    //a. Leer el archivo de info
    const archivo = await fs.promises.readFile('./clase4/info.txt', 'utf-8');

    //b. Mostrar el archivo en consola
    console.log(archivo);

    //c. Cambiamos el author
    const info = JSON.parse(archivo);
    info.contenidoObj.author = 'Coderhouse';

    await fs.promises.writeFile('./clase4/package.json.coder', JSON.stringify(info, null, 2));
    console.log('El archivo ha sido escrito con éxito');
  } catch (error) {
    console.log(error);
  }
};

funcion();
