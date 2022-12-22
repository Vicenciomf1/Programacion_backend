import { Router } from 'express'

import path from 'path'

const authWebRouter = new Router()

authWebRouter.get('/', (req, res) => {
    //Si la sesion no existe, redirigir a login, sino redirigir a home
    res.redirect('/home')
})

authWebRouter.get('/login', (req, res) => {
    //Si ya existe una sesion, redirigir al home
    res.sendFile(process.cwd() + '/views/login.html')
})

authWebRouter.get('/logout', (req, res) => {
    //Obtener el nombre del usuario
    //Eliminar la sesion con destroy
    //Renderizar la plantilla con el nombre de usuario
    res.render(process.cwd() + '/views/pages/logout.ejs', { nombre: 'usuario' })
})


authWebRouter.post('/login', (req, res) => {
    console.log(req.body);
    //Guardar el nombre que viene en el body en la sesion.
    res.redirect('/home')
})



export default authWebRouter