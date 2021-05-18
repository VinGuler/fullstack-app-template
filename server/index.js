// General imports
const path = require('path')

// General variables
// const staticFolder = path.join(__dirname, 'files')

// Server port
let PORT = 3000
// try {
//   const config = require('../config')
//   PORT = config['client-port'] || PORT
// } catch (error) {
//   console.warn('Error requiring config file')
// }
// console.log(`CLIENT PORT SET TO ${PORT}`)

// Express REST app imports configuration
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
// // Using Express json parsing
// app.use(express.json())
// // Setting Express static folder
// app.use(express.static(staticFolder))

// Database
// const db = require('./db')

// Express Server routes
// const { initializeAppRoutes } = require('./routes.js')
// initializeAppRoutes(app, db, { staticFolder })

// Socket.io imports and configuration
const http = require('http')
const server = http.createServer(app)
const socketIO = require('socket.io')
const io = socketIO(server, {
  allowEIO3: true,
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true
  }
})
io.on('connection', (client) => {
  console.log('connection made')
  client.on('get-data', () => {
    console.log('get-data')
    client.emit('get-data', { data: 'data' })
  })
  client.on('event', (data) => {
    console.log('event', data)
  })
  client.on('disconnect', () => {
    console.log('disconnect')
  })
})

// Listening
server.listen(PORT, () => {
  console.log(`Simple server is listening at http://localhost:${PORT}`)
})

