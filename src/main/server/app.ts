import { createServer } from 'node:http'
import { server as WebSocketServer } from 'websocket'
import crypto from 'crypto'

const server = createServer((_req, res) => {
  res.end('Hello from HTTP!')
})

const webSocketServer = new WebSocketServer({ httpServer: server })

webSocketServer.on('request', request => {
  if (request.resourceURL.pathname !== '/ws') return
  
  const connectionId = crypto.randomUUID()
  const connection = request.accept()

  setInterval(() => connection.send(JSON.stringify({ connectionId })), 5000)
})

export { server }
