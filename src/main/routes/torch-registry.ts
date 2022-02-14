import { Router } from '@/main/server/router'
import { randomUUID } from 'crypto'

export function torchRegistryRoutes(router: Router) {
  router.defineRoute({
    entryEvent: 'create-torch-registry',
    responseEvent: 'create-torch-registry-response',
    handler: async (ctx, connection) => {
      console.log(ctx)
      connection.send(JSON.stringify({
        event: 'create-torch-registry-response',
        headers: ctx.headers,
        data: {
          id: randomUUID(),
          characterName: 'any name',
          torchCount: 1,
          torchCharge: 3,
          isLit: true
        }
      }))      
    }
  })
}
