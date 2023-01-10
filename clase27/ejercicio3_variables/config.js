//Input: MODO=dev PUERTO=8080 DEBUG=true node config.js
//Output: { modo: 'dev', puerto: 8080, debug: true }
//Input: node config.js 
//Output: { modo: 'prod', puerto: 0, debug: false }
const modo = process.env.MODO ?? 'prod';
const puerto = Number(process.env.PUERTO ?? 0);
const debug = process.env.DEBUG == 'true' ?? false;

console.log({
  modo,
  puerto,
  debug
});