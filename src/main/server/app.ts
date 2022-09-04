import { createServer } from 'node:http'
import crypto from 'node:crypto'
import { server as WebSocketServer } from 'websocket'
import { RouteContext, router } from '@/main/server/router.js'
import { defineRoutes } from '@/main/config/routes.js'
import { getRequestData } from '@/main/server/get-request-data.js'
import { cors } from '@/main/server/cors.js'

const server = createServer(async (req, res) => {
  const { method = 'GET', url } = req

  if (method === 'OPTIONS') {
    cors(res)
    res.statusCode = 200
    res.end()

    return
  }

  const { pathname, searchParams } = new URL(`http://any-host.io${url}`)

  const queryParams = Object.fromEntries(searchParams.entries())

  const body = await getRequestData(req)

  const { handler, params } = router.getHttpHandler(method.toLowerCase(), pathname)

  if (handler) {
    const request = {
      headers: req.headers,
      params,
      queryParams,
      body
    }

    return handler(request, res)
  }

  res.statusCode = 404
  res.end('Not Found!')
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

      const handler = router.getWsHandler(messageData.event)

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
