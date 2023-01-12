
console.log('---------Propiedades de Process-----------');

console.log('Id del proceso: ' + process.pid);
console.log('Version de node: ' + process.version);
console.log('Titulo del proceso: ' + process.title);
console.log('Sistema operativo: ' + process.platform);
console.log('Direccion del ejecutable: ' + process.execPath);

console.log('-----------Metodos de Process-------------');

process.stdout.write('Probando console log desde stdout \n');
console.log('Directorio de trabajo: ' + process.cwd());
for (const [key,value] of Object.entries(process.memoryUsage())){
    console.log(`Memory usage by ${key}, ${value/1000000}MB `)
}

console.log('-----------Eventos de Process-------------');

process.on('exit', code => {
  console.log(`Saliendo del programa con codigo: ${code}`);
});

process.on('uncaughtException', code => {
  console.log(`Ocurrio un error`);
});

noexistefuncion();

process.exit(2);