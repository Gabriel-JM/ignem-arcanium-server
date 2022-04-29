import { accountRoutes } from '@/main/routes/account'
import { cors } from '@/main/routes/cors'
import { torchRegistryRoutes } from '@/main/routes/torch-registry'
import { Router } from '@/main/server/router'

export function defineRoutes(router: Router) {
  cors(router)
  torchRegistryRoutes(router)
  accountRoutes(router)
}
