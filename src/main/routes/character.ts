import { adaptRoute } from '@/main/adapters/index.js'
import {
  makeCreateCharacterController,
  makeDeleteCharacterController,
  makeFindAllCharactersController,
  makeUpdateCharacterController
} from '@/main/factories/controllers/index.js'
import { Router } from '@/main/server/router.js'

export function characterRoutes(router: Router) {
  router.http('get', '/characters', adaptRoute(makeFindAllCharactersController()))
  router.http('post', '/characters', adaptRoute(makeCreateCharacterController()))
  router.http('put', '/characters/:id', adaptRoute(makeUpdateCharacterController()))
  router.http('delete', '/characters/:id', adaptRoute(makeDeleteCharacterController()))
}
