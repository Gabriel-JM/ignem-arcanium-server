import { RouteContext } from '@/main/server/router'
import { Controller } from '@/presentation/protocols'
import { connection } from 'websocket'

export function adapt(controller: Controller, responseEvent: string) {
  return async (ctx: RouteContext, conn: connection) => {
    const requestData = {
      ...ctx?.headers,
      ...ctx?.data
    }

    const response = await controller.handle(requestData)

    conn.send(JSON.stringify({
      event: responseEvent,
      headers: ctx.headers,
      data: response.body
    }))
  }
}
