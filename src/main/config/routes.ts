import { accountRoutes } from '@/main/routes/account.js'
import { characterRoutes } from '@/main/routes/character.js'
import { attributesInfoRoutes } from '@/main/routes/info/attributes.js'
import { itemRoutes } from '@/main/routes/item.js'
import { torchRegistryRoutes } from '@/main/routes/torch-registry.js'
import { Router } from '@/main/server/router.js'

export function defineRoutes(router: Router) {
  accountRoutes(router)
  characterRoutes(router)
  torchRegistryRoutes(router)
  itemRoutes(router)
  attributesInfoRoutes(router)
}
