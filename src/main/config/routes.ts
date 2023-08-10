import { contentRoutes } from '@/content/content-routes.js'
import { filesRoutes } from '@/file/files-routes.js'
import { accountRoutes } from '@/main/routes/account.js'
import { Router } from '@/main/server/router.js'

export function defineRoutes(router: Router) {
  accountRoutes(router)
  contentRoutes(router)
  filesRoutes(router)
  // characterRoutes(router)
  // itemRoutes(router)
  // attributesInfoRoutes(router)
}
