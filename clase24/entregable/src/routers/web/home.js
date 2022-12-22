import { Router } from 'express'

const productosWebRouter = new Router()

//Interceptar con middleware o con if, para restringir home si no hay sesion
productosWebRouter.get('/home', (req, res) => {
    //Cambiar el nombre de usuario
    res.render(process.cwd() + '/views/pages/home.ejs', { nombre: 'usuario' })
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile(process.cwd() + '/views/productos-vista-test.html')
})

export default productosWebRouter