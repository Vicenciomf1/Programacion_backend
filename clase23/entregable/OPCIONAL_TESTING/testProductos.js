import ContenedorSQL from '../src/contenedores/ContenedorSQL.js'
import config from '../src/config.js'

const dbName = 'mariaDb'
const tableName = 'productos'

const contenedor = new ContenedorSQL(config[dbName], tableName)

try {
    const res = await contenedor.guardar({
        title: 'coca',
        price: 12.34,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnL-AibR8iEbML_MifNkcnQ0-fljiaSm3vQ-GqKdDrS6NM4VYf1wgIVpZ7E0fequdDQEjZ3SWtiA&usqp=CAc'
    })

    console.log(res)

    const res2 = await contenedor.guardar({
        title: 'pepsi',
        price: 56.78,
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnL-AibR8iEbML_MifNkcnQ0-fljiaSm3vQ-GqKdDrS6NM4VYf1wgIVpZ7E0fequdDQEjZ3SWtiA&usqp=CAc'
    })

    console.log(res2)

    console.log(await contenedor.listarAll())

    await contenedor.actualizar({
        price: 56.99,
    }, 2)

    await contenedor.borrar(1)

    console.log(await contenedor.listarAll())

    console.log('----- fin test -----')

} catch (error) {
    console.log(error)
} finally {
    await contenedor.desconectar()
}
