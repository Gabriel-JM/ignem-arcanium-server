import { adaptRoute } from '@/main/adapters'
import { makeAttributesDetailsController } from '@/main/factories/controllers'
import { Router } from '@/main/server/router'

export function attributesInfoRoutes(router: Router) {
  router.http('get', '/info/attributes', adaptRoute(makeAttributesDetailsController()))
}
