import { adaptRoute } from '@/main/adapters/index.js'
import { makeListAllCommonItemsController } from '@/main/factories/controllers/index.js'
import { Router } from '@/main/server/router.js'

export function itemRoutes(router: Router) {
  router.http('get', '/items', adaptRoute(makeListAllCommonItemsController()))
}
