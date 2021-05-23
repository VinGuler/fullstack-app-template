// General imports
const path = require('path')

// PROCESS
const socket_lib = process.argv[2] ? process.argv[2].toLowerCase() : null
const USE_SOCKET_IO = socket_lib === 'socket-io'
const USE_WS_SERVER = socket_lib === 'ws-server'

// General variables
const staticFolder = path.join(__dirname, 'files')
const port = 3000

// Express REST app imports configuration
const express = require('express')
const app = express()
// Using cors middleware
const cors = require('cors')
app.use(cors())
// Using Express json parsing
app.use(express.json())
// Setting Express static folder
app.use(express.static(staticFolder))

// Database
const db = require('./database')
const Database = new db()

// Express Server routes
const { initializeAppRoutes } = require('./routes')
initializeAppRoutes(app, Database, { staticFolder })

// Socket.io Server
if (USE_SOCKET_IO) {
  console.log('Server will use Socket.io')
  const { initializeAppSocketIO } = require('./socket-io-server')
  const server = initializeAppSocketIO(app)
  server.listen(port, () => {
    console.log(`Simple server is listening at http://localhost:${port}`)
  })
}

// WS Socket Server
else if (USE_WS_SERVER) {
  console.log('Server will use WS Server')
  const { initializeAppWebSocket } = require('./ws-server')
  const wsServer = initializeAppWebSocket()
  const server = app.listen(port, () => {
    console.log(`Simple server is listening at http://localhost:${port}`)
  })
  server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
      wsServer.emit('connection', socket, request)
    })
  })
}

// Regular Express Server
else {
  console.log('Server will use regular Express')
  app.listen(port, () => {
    console.log(`Simple server is listening at http://localhost:${port}`)
  })
}
