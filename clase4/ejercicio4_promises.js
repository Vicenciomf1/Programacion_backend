//Importamos la libreria file system
const fs = require('fs');

//Obtenemos el archivo
const archivo = fs.promises.readFile('clase4/info.txt', 'utf-8')
  .then((result) => {
    //Guardamos el resultado y hacemos el parse
    const info = JSON.parse(result);

    //Imprimimos el objeto
    console.log(info);

    //Cambiamos el author
    info.contenidoObj.author = 'Coderhouse';

    //Guardamos el cambio en un nuevo archivo
    fs.promises.writeFile('clase4/package.json.coder', JSON.stringify(info, null, 2))
      .catch(console.log); //Imprimimos cualquier posible error
  })
  .catch(console.log); //Imprimimos cualquier posible error