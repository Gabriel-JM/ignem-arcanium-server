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
  defineRoute(eventName: string, handler: RouteHandler): void
  getHandler(event: string): RouteHandler | undefined
}

class WebSocketRouter implements Router {
  routeEvents = new Map<string, RouteHandler>()

  defineRoute(eventName: string, handler: RouteHandler) {
    this.routeEvents.set(eventName, handler)
  }

  getHandler(event: string) {
    return this.routeEvents.get(event)
  }
}

const router = new WebSocketRouter()

export { router }
