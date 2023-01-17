import express from 'express';

//tasklist /fi "imagename eq node.exe" -> lista todos los procesos de node.js activos
//taskkill /pid numpid /f -> mata un proceso por su número de PID

//npm i -g pm2
//npm list -g | grep pm2

// -------------- MODO FORK -------------------
//pm2 start server.js --name="ServerX" --watch -- PORT
//pm2 start server.js --name="Server1" --watch -- 8081
//pm2 start server.js --name="Server2" --watch -- 8082

// -------------- MODO CLUSTER -------------------
//pm2 start server.js --name="ServerX" --watch -i max -- PORT
//pm2 start server.js --name="Server3" --watch -i max -- 8083
//pm2 start server.js --name="Server4" --watch -i max -- 8084

//pm2 list
//pm2 delete id/name
//pm2 desc name
//pm2 monit
//pm2 --help
//pm2 logs
//pm2 flush

const app = express();

const PORT = process.argv[2] || 8080;

app.get('/', (req, res) => {
  res.send(`Servidor express en Puerto: ${PORT}, PID: ${process.pid} - ${(new Date()).toLocaleString()}`);
}); 

const servidor = app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${PORT}, PID: ${process.pid}`)
});