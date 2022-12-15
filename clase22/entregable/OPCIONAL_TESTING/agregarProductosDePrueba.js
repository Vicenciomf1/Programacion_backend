import knex from 'knex'
import config from '../src/config.js'

try {
    const mariaDbClient = knex(config.mariaDb)

    const producto = {
        title: "pepsi",
        price: "180",
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnL-AibR8iEbML_MifNkcnQ0-fljiaSm3vQ-GqKdDrS6NM4VYf1wgIVpZ7E0fequdDQEjZ3SWtiA&usqp=CAc",
        id: 1
    }

    await mariaDbClient.insert(producto).into('productos')

    await mariaDbClient.destroy()

    console.log('productos agregados con éxito en mariaDb')
} catch (error) {
    console.log('error al agregar productos en mariaDb')
    console.log(error)
}
