import { Router } from '@/main/server/router.js'
import { makeContentController } from './content-factories.js'
import { adaptRoute } from '@/main/adapters/http-handler-adapter.js'

export function contentRoutes(router: Router) {
  const contentFns = makeContentController()

  router.http('get', '/contents', adaptRoute(contentFns.findByAccount))
  router.http('post', '/contents', adaptRoute(contentFns.create))
}
