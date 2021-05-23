const ws = require('ws')

const initializeAppWebSocket = function () {
  const data = {
    messages: [{ id: 1, user: 'user-1', content: 'this is a message' }]
  }
  const wsServer = new ws.Server({ noServer: true })
  wsServer.on('connection', (socket, request) => {
    console.log('client connected')
    clients.push(socket)
    socket.on('get-messages', () => {
      socket.send(JSON.stringify({ id: 'get-messages', data }))
    })
    socket.on('send-message', (message) => {
      data.messages.push({
        id: data.messages[data.messages.length - 1].id + 1,
        user: socket.id,
        content: message
      })
      wsServer.clients.forEach((client) => {
        client.send(JSON.stringify({ id: 'get-messages', data }))
      })
    })
    socket.on('disconnect', () => {
      console.log('socket disconnect')
    })
  })

  return wsServer
}

exports.initializeAppWebSocket = initializeAppWebSocket
