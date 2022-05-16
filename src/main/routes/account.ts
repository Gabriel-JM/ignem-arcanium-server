import { adaptRoute } from '@/main/adapters'
import {
  makeAccountLoginController,
  makeCreateAccountController,
  makeVerifyTokenController
} from '@/main/factories/controllers'
import { Router } from '@/main/server/router'

export function accountRoutes(router: Router) {
  router.http('post', '/login', adaptRoute(makeAccountLoginController()))
  router.http('post', '/accounts', adaptRoute(makeCreateAccountController()))
  router.http('post', '/verify', adaptRoute(makeVerifyTokenController()))
}
