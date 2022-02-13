import { connection } from 'websocket'

export interface RouteContext {
  event: string
  headers: {
    connectionId: string
  }
  data: Record<string, any>
}

export interface RouteDefinition {
  entryEvent: string
  responseEvent: string
  handler: (ctx: RouteContext, conn: connection) => Promise<void>
}

export interface Router {
  defineRoute(definition: RouteDefinition): void
  getHandler(event: string): RouteDefinition['handler'] | undefined
}

class WebSocketRouter implements Router {
  routeEvents = new Map<string, Omit<RouteDefinition, 'entryEvent'>>()

  defineRoute(definition: RouteDefinition) {
    this.routeEvents.set(definition.entryEvent, {
      handler: definition.handler,
      responseEvent: definition.responseEvent
    })
  }

  getHandler(event: string) {
    return this.routeEvents.get(event)?.handler
  }

  getResponseEvent(event: string) {
    return this.routeEvents.get(event)?.responseEvent
  }
}

const router = new WebSocketRouter()

export { router }
