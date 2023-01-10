
const argumentos = process.argv.slice(2);
for (let index = 0; index < argumentos.length; index++) {
  console.log(index + " -> " + argumentos[index]);
}