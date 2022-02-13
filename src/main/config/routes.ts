import { torchRegistryRoutes } from '@/main/routes/torch-registry'
import { Router } from '@/main/server/router'

export function defineRoutes(router: Router) {
  torchRegistryRoutes(router)
}
