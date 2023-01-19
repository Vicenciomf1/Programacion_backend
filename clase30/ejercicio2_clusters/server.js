import express from 'express';
import cluster from 'cluster';
import os from 'os';

const numProcesadores = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Nuevo master: ${process.pid} corriendo, con ${numProcesadores} workers`);

  for (let i = 0 ; i < numProcesadores ; i++) {
    cluster.fork(); // node server.js //modo-worker
  }

  cluster.on('exit', (worker) => {
    console.log(`El worker ${worker.process.pid} ha muerto`);
    cluster.fork(); // node server.js //modo-worker
  }); 

} else {
  const app = express();
  const PORT = process.argv[2] || 8080;
  // app.use(express.static('public'));
  app.get('/datos', (req, res) => {
    res.send(`Servidor express en Puerto: ${PORT}, Workers: ${numProcesadores}, PID: ${process.pid} - ${(new Date()).toLocaleString()}`);
  }); 
  
  const servidor = app.listen(PORT, () => {
    console.log(`Worker en ${PORT}, PID: ${process.pid}`)
  });
}
