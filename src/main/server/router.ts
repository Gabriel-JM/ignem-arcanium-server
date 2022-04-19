import { connection } from 'websocket'

export interface RouteContext {
  event: string
  headers: {
    connectionId: string
  }
  data: Record<string, any>
}

export type RouteHandler = (ctx: RouteContext, conn: connection) => Promise<void>

export interface Router {
  wsEvent(eventName: string, handler: RouteHandler): void
  getWsHandler(event: string): RouteHandler | undefined
}

class WebSocketRouter implements Router {
  routeEvents = new Map<string, RouteHandler>()

  wsEvent(eventName: string, handler: RouteHandler) {
    this.routeEvents.set(eventName, handler)
  }

  getWsHandler(event: string) {
    return this.routeEvents.get(event)
  }
}

const router = new WebSocketRouter()

export { router }
