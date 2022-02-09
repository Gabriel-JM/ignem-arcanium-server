import { Router } from '@/main/server/router'

export function torchRegistryRoutes(router: Router) {
  router.defineRoute({
    entryEvent: 'create-torch-registry',
    responseEvent: 'create-torch-registry-response',
    handler: async (ctx) => {
      
    }
  })
}
