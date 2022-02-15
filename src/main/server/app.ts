import { createServer } from 'node:http'
import { server as WebSocketServer } from 'websocket'
import crypto from 'crypto'
import { RouteContext, router } from '@/main/server/router'
import { defineRoutes } from '@/main/config/routes'

const server = createServer((_req, res) => {
  res.end('Hello from HTTP!')
})

const webSocketServer = new WebSocketServer({ httpServer: server })

defineRoutes(router)

webSocketServer.on('request', request => {
  if (request.resourceURL.pathname !== '/ws') return
  
  const connectionId = crypto.randomUUID()
  const connection = request.accept()

  connection.on('message', async message => {
    if (message.type === 'utf8') {
      const messageData = JSON.parse(message.utf8Data) as RouteContext

      const handler = router.getHandler(messageData.event)

      await handler?.(messageData, connection)
    }
  })

  connection.send(JSON.stringify({
    event: 'accept-connection',
    headers: { connectionId },
    data: null
  }))
})

export { server }
