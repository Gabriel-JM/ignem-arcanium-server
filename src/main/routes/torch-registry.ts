import { Router } from '@/main/server/router'

export function torchRegistryRoutes(router: Router) {
  router.defineRoute({
    entryEvent: 'create-torch-registry',
    responseEvent: 'create-torch-registry-response',
    handler: async (ctx, connection) => {
      console.log(ctx)
      connection.send(JSON.stringify({
        event: 'create-torch-registry-response',
        headers: ctx.headers,
        data: null
      }))      
    }
  })
}
