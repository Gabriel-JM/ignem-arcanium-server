import { Router } from '@/main/server/router.ts'
import { makeContentController } from './content-factories.ts'
import { adaptRoute } from '@/main/adapters/http-handler-adapter.ts'

export function contentRoutes(router: Router) {
  const contentFns = makeContentController()

  router.http('get', '/contents', adaptRoute(contentFns.findByAccount))
  router.http('post', '/contents', adaptRoute(contentFns.create))
}
