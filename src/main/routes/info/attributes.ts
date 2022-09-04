import { adaptRoute } from '@/main/adapters/index.js'
import { makeAttributesDetailsController } from '@/main/factories/controllers/index.js'
import { Router } from '@/main/server/router.js'

export function attributesInfoRoutes(router: Router) {
  router.http('get', '/info/attributes', adaptRoute(makeAttributesDetailsController()))
}
