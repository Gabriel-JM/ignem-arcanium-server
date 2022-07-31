import { adaptRoute } from '@/main/adapters'
import { makeListAllCommonItemsController } from '@/main/factories/controllers'
import { Router } from '@/main/server/router'

export function itemRoutes(router: Router) {
  router.http('get', '/items', adaptRoute(makeListAllCommonItemsController()))
}
