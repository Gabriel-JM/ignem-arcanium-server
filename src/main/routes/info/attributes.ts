import { adaptRoute } from '@/main/adapters/index.ts'
import { makeAttributesDetailsController } from '@/main/factories/controllers/index.ts'
import { Router } from '@/main/server/router.ts'

export function attributesInfoRoutes(router: Router) {
  router.http('get', '/info/attributes', adaptRoute(makeAttributesDetailsController()))
}
