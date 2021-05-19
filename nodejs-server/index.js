// General imports
const path = require('path')

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
const { initializeAppSocketIO } = require('./socket-io-server')
const server = initializeAppSocketIO(app)

// Listening
server.listen(port, () => {
  console.log(`Simple server is listening at http://localhost:${port}`)
})
