//Callback simple
console.log('-------Callback Simple--------');

const funcionConCallback = funcion => funcion();
const holaMundo = () => console.log('Hola mundo');
funcionConCallback(holaMundo);

//Callback con parametros
console.log('-------Callback Con Parametros--------');

const funcionConCallbackParams = (parametros, funcion) => funcion(parametros);
const saludosDesde = (parametros) => console.log(`Saludos desde ${parametros}`);
funcionConCallbackParams('Arg!',saludosDesde);