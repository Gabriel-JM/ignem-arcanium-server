export interface RouteContext {
  event: string
  connection: {
    connectionId: string
  }
  data: Record<string, any>
}

export interface RouteDefinition {
  entryEvent: string
  responseEvent: string
  handler: (ctx: RouteContext) => Promise<void>
}

export interface Router {
  defineRoute(definition: RouteDefinition): void
  getHandler(event: string): Omit<RouteDefinition, 'entryEvent'> | undefined
}

export const router = {
  routeEvents: new Map<string, Omit<RouteDefinition, 'entryEvent'>>(),

  defineRoute(definition: RouteDefinition) {
    this.routeEvents.set(definition.entryEvent, {
      handler: definition.handler,
      responseEvent: definition.responseEvent
    })
  },

  getHandler(event: string) {
    return this.routeEvents.get(event)?.handler
  },

  getResponseEvent(event: string) {
    return this.routeEvents.get(event)?.responseEvent
  }
}
