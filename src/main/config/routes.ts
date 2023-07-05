import { contentRoutes } from '@/content/content-routes.ts'
import { accountRoutes } from '@/main/routes/account.ts'
import { Router } from '@/main/server/router.ts'

export function defineRoutes(router: Router) {
  accountRoutes(router)
  contentRoutes(router)
  // characterRoutes(router)
  // itemRoutes(router)
  // attributesInfoRoutes(router)
}
