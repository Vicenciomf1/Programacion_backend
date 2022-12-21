import ContenedorSQL from '../src/contenedores/ContenedorSQL.js'
import config from '../src/config.js'

const dbName = 'sqlite3'
const tableName = 'mensajes'

const contenedor = new ContenedorSQL(config[dbName], tableName)

try {
    const res = await contenedor.guardar({
        autor: 'mariano',
        texto: 'hola, soy mariano!',
        fyh: new Date().toLocaleString()
    })

    console.log(res)

    const res2 = await contenedor.guardar({
        autor: 'coderhouse',
        texto: 'hola, soy coderhouse!',
        fyh: new Date().toLocaleString()
    })

    console.log(res2)

    console.log(await contenedor.listarAll())

    console.log('----- fin test -----')

} catch (error) {
    console.log(error)
} finally {
    await contenedor.desconectar()
}
