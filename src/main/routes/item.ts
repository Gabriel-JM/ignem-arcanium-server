import { adaptRoute } from '@/main/adapters/index.ts'
import { makeListAllCommonItemsController } from '@/main/factories/controllers/index.ts'
import { Router } from '@/main/server/router.ts'

export function itemRoutes(router: Router) {
  router.http('get', '/items', adaptRoute(makeListAllCommonItemsController()))
}
