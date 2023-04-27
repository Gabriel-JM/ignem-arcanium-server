import { contentRoutes } from '@/content/content-routes.js'
import { accountRoutes } from '@/main/routes/account.js'
import { characterRoutes } from '@/main/routes/character.js'
import { attributesInfoRoutes } from '@/main/routes/info/attributes.js'
import { itemRoutes } from '@/main/routes/item.js'
import { Router } from '@/main/server/router.js'

export function defineRoutes(router: Router) {
  accountRoutes(router)
  contentRoutes(router)
  characterRoutes(router)
  itemRoutes(router)
  attributesInfoRoutes(router)
}
