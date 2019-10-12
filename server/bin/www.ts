#!/usr/bin/env node

import app from '../app'
import debug from 'debug'
import { createServer } from 'http'

const log = debug('server:server')

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const server = createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val: string) {
    const port = parseInt(val, 10)
    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    return false
}

function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error
    }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}

function onListening() {
    var addr = server.address()
    if (!addr) {
        return
    }
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    log('Listening on ' + bind)
}
