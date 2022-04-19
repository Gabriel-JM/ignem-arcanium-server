import { connection } from 'websocket'
import { IncomingMessage, ServerResponse } from 'http'

export interface RouteContext {
  event: string
  headers: {
    connectionId: string
  }
  data: Record<string, any>
}

export type WsEventHandler = (ctx: RouteContext, conn: connection) => Promise<void>
export type HttpRouteHandler = (req: IncomingMessage, res: ServerResponse) => Promise<void>

export interface Router {
  wsEvent(eventName: string, handler: WsEventHandler): void
  http(method: string, route: string, handler: HttpRouteHandler): void
  getWsHandler(event: string): WsEventHandler | undefined
  getHttpHandler(method: string, route: string): HttpRouteHandler | undefined
}

class WebSocketRouter implements Router {
  routeEvents = new Map<string, WsEventHandler>()
  httpRoutes = new Map<string, HttpRouteHandler>()
  
  http(method: string, route: string, handler: HttpRouteHandler): void {
    this.httpRoutes.set(`${method}::${route}`, handler)
  }

  getHttpHandler(method: string, route: string): HttpRouteHandler | undefined {
    return
  }

  wsEvent(eventName: string, handler: WsEventHandler) {
    this.routeEvents.set(eventName, handler)
  }

  getWsHandler(event: string) {
    return this.routeEvents.get(event)
  }
}

const router = new WebSocketRouter()

export { router }
