import { Router } from 'express'
import { calcular } from '../../api/randoms.js'

const randomsApiRouter = new Router()

randomsApiRouter.get('/api/randoms', async (req, res) => {
    //Obtener cantidad por query params
    //llamar la funcion del api, mandar la cantidad y recibir el resultado
    // res.json(result)
})

export default randomsApiRouter