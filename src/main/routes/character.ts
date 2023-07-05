import { adaptRoute } from '@/main/adapters/index.ts'
import {
  makeCreateCharacterController,
  makeDeleteCharacterController,
  makeFindAllCharactersController,
  makeUpdateCharacterController
} from '@/main/factories/controllers/index.ts'
import { Router } from '@/main/server/router.ts'

export function characterRoutes(router: Router) {
  router.http('get', '/characters', adaptRoute(makeFindAllCharactersController()))
  router.http('post', '/characters', adaptRoute(makeCreateCharacterController()))
  router.http('put', '/characters/:id', adaptRoute(makeUpdateCharacterController()))
  router.http('delete', '/characters/:id', adaptRoute(makeDeleteCharacterController()))
}
