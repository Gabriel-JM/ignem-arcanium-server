import { adaptRoute } from '@/main/adapters'
import { makeAccountLoginController, makeCreateAccountController } from '@/main/factories/controllers'
import { Router } from '@/main/server/router'

export function accountRoutes(router: Router) {
  router.http('post', '/login', adaptRoute(makeAccountLoginController()))
  router.http('post', '/accounts', adaptRoute(makeCreateAccountController()))
}
