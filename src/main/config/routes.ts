import { accountRoutes } from '@/main/routes/account'
import { characterRoutes } from '@/main/routes/character'
import { torchRegistryRoutes } from '@/main/routes/torch-registry'
import { Router } from '@/main/server/router'

export function defineRoutes(router: Router) {
  accountRoutes(router)
  characterRoutes(router)
  torchRegistryRoutes(router)
}
