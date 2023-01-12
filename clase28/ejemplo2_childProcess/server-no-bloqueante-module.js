import http from 'http';
import { fork } from 'child_process';


let visitas = 0

const server = http.createServer()
server.on('request', (req,res) => {
    let { url } = req
    if(url == '/calcular') {
        //const sum = calculo()
        const computo = fork('./computo_module.js')
        computo.on('message', (param) => {
            if (param == 'listo') {
                computo.send('start')
            } else {
                res.end(`La suma es ${param}`)
            }
        });
    }
    else if(url == '/') {
        res.end('Ok ' + (++visitas))
    }
})

const PORT = 8080
server.listen(PORT, err => {
    if(err) throw new Error(`Error en servidor: ${err}`)
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})