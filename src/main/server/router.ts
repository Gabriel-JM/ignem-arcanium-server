import { connection } from 'websocket'
import { ServerResponse } from 'http'
import { findPathMatch } from '@/main/server/find-path-match'

export interface RouteContext {
  event: string
  headers: {
    connectionId: string
  }
  data: Record<string, any>
}

export interface RequestData {
  headers: Record<string, unknown>
  params: Record<string, string>
  queryParams: Record<string, string>
  body: any
}

export type WsEventHandler = (ctx: RouteContext, conn: connection) => Promise<void>
export type HttpRouteHandler = (req: RequestData, res: ServerResponse) => void | Promise<void>
export type HttpRoute = {
  handler: HttpRouteHandler
  params: Record<string, string>
}

export interface Router {
  wsEvent(eventName: string, handler: WsEventHandler): void
  http(method: string, route: string, handler: HttpRouteHandler): void
  getWsHandler(event: string): WsEventHandler | undefined
  getHttpHandler(method: string, route: string): HttpRoute
}

class WebSocketRouter implements Router {
  routeEvents = new Map<string, WsEventHandler>()
  httpRoutes = new Map<string, HttpRouteHandler>()
  
  http(method: string, route: string, handler: HttpRouteHandler): void {
    this.httpRoutes.set(`${method.toLowerCase()}::${route}`, handler)
  }

  getHttpHandler(method: string, route: string): HttpRoute {
    const path = findPathMatch(this.httpRoutes, method, route)

    return path
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
