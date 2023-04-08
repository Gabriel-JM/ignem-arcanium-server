import {
  makeAccountLoginController,
  makeCreateAccountController,
  makeVerifyTokenController
} from '@/account/main/factories/index.js'
import { adaptRoute } from '@/main/adapters/index.js'
import { Router } from '@/main/server/router.js'

export function accountRoutes(router: Router) {
  router.http('post', '/login', adaptRoute(makeAccountLoginController()))
  router.http('post', '/accounts', adaptRoute(makeCreateAccountController()))
  router.http('post', '/verify', adaptRoute(makeVerifyTokenController()))
}
