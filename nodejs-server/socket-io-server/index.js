const http = require('http')
const socketIO = require('socket.io')

const initializeAppSocketIO = function (app) {
  const server = http.createServer(app)
  const io = socketIO(server, {
    allowEIO3: true,
    cors: {
      origin: 'http://localhost:8080',
      methods: ['GET', 'POST'],
      credentials: true
    }
  })
  const data = {
    messages: [
      { id: 1, user: 'user-1', content: 'this is a message' }
    ]
  }
  let user = 'user-'
  io.on('connection', (socket) => {
    console.log('socket connected')
    socket.on('get-messages', () => {
      socket.emit('getMessages', data)
    })
    socket.on('send-message', (message) => {
      data.messages.push({
        id: data.messages[data.messages.length - 1].id + 1,
        user: socket.id,
        content: message
      })
      io.sockets.emit('getMessages', data)
    })
    socket.on('disconnect', () => {
      console.log('socket disconnect')
    })
  })
  return server
}

exports.initializeAppSocketIO = initializeAppSocketIO
