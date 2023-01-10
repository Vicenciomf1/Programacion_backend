//Input:
// node main.js 1 2 3 -m dev -p 8080 -d
//Resultado esperado:
// { modo: 'dev', puerto: 8080, debug: true, otros: [ 1, 2, 3 ] }

//Input:
// node main.js 1 2 3
//Resultado esperado:
// { modo: 'prod', puerto: 0, debug: false, otros: [ 1, 2, 3 ] }

const yargs = require("yargs")(process.argv.slice(2));

const { modo, puerto, debug, _ } = yargs
.alias({
  m: 'modo',
  p: 'puerto',
  d: 'debug'
})
.default({
  modo: 'prod',
  puerto: 0,
  debug: false
})
.argv;

console.log({ modo, puerto, debug, otros: _ });