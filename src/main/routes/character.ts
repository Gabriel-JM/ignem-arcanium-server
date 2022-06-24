import { adaptRoute } from '@/main/adapters'
import { makeCreateCharacterController, makeFindAllCharactersController } from '@/main/factories/controllers'
import { Router } from '@/main/server/router'

export function characterRoutes(router: Router) {
  router.http('post', '/characters', adaptRoute(makeCreateCharacterController()))
  router.http('get', '/characters', adaptRoute(makeFindAllCharactersController()))
}