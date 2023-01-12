import dotenv from 'dotenv'
import parseArgs from 'minimist'

dotenv.config()

const argv = parseArgs(process.argv.slice(2), { alias: { p: 'port' }, default: { port: 8080 } })

const sessionConfig = {
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
};

export default {
    PORT: argv.port,
    session: sessionConfig,
    mongoLocal: {
        client: 'mongodb',
        cnxStr: process.env.MONGODB_LOCAL
    },
    mongoRemote: {
        client: 'mongodb',
        cnxStr: process.env.MONGODB_REMOTO
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: process.env.SQLITE3
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: process.env.MYSQL
    },
    fileSystem: {
        path: process.env.FILESYSTEM
    },
    facebookClientId: process.env.FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
}