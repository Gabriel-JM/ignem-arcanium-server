import { Controller } from '@/common/presentation/protocols/index.js'
import { RouteContext } from '@/main/server/router.js'
import { connection } from 'websocket'

export function adaptEvent(controller: Controller, responseEvent: string) {
  return async (ctx: RouteContext, conn: connection) => {
    const requestData = {
      ...ctx?.headers,
      ...ctx?.data
    }

    const response = await controller.handle(requestData)

    conn.send(JSON.stringify({
      event: responseEvent,
      statusCode: response.statusCode,
      headers: ctx.headers,
      data: response.body
    }))
  }
}
