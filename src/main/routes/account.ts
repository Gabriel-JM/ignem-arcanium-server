import {
  makeAccountLoginController,
  makeCreateAccountController,
  makeVerifyTokenController
} from '@/account/main/factories/index.ts'
import { adaptRoute } from '@/main/adapters/index.ts'
import { Router } from '@/main/server/router.ts'

export function accountRoutes(router: Router) {
  router.http('post', '/login', adaptRoute(makeAccountLoginController()))
  router.http('post', '/accounts', adaptRoute(makeCreateAccountController()))
  router.http('post', '/verify', adaptRoute(makeVerifyTokenController()))
}
