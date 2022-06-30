import { adaptRoute } from '@/main/adapters'
import {
  makeCreateCharacterController,
  makeDeleteCharacterController,
  makeFindAllCharactersController,
  makeUpdateCharacterController
} from '@/main/factories/controllers'
import { Router } from '@/main/server/router'

export function characterRoutes(router: Router) {
  router.http('get', '/characters', adaptRoute(makeFindAllCharactersController()))
  router.http('post', '/characters', adaptRoute(makeCreateCharacterController()))
  router.http('put', '/characters/:id', adaptRoute(makeUpdateCharacterController()))
  router.http('delete', '/characters/:id', adaptRoute(makeDeleteCharacterController()))
}
