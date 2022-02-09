import { createServer } from 'node:http'
import { server as WebSocketServer } from 'websocket'
import crypto from 'crypto'
import { RouteContext, router } from '@/main/server/router'

const server = createServer((_req, res) => {
  res.end('Hello from HTTP!')
})

const webSocketServer = new WebSocketServer({ httpServer: server })

webSocketServer.on('request', request => {
  if (request.resourceURL.pathname !== '/ws') return
  
  const connectionId = crypto.randomUUID()
  const connection = request.accept()

  connection.on('message', message => {
    if (message.type === 'utf8') {
      const messageData = JSON.parse(message.utf8Data) as RouteContext

      const handler = router.getHandler(messageData.event)

      handler?.(messageData)
    }
  })

  connection.send(JSON.stringify({ connectionId }))
})

export { server }
