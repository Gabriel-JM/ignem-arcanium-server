import { adaptRoute } from '@/main/adapters'
import { makeCreateAccountController } from '@/main/factories/controllers'
import { Router } from '@/main/server/router'

export function accountRoutes(router: Router) {
  router.http('post', '/account', adaptRoute(makeCreateAccountController()))
}
