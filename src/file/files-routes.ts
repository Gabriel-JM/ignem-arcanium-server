import { adaptRoute } from '@/main/adapters/http-handler-adapter.js'
import { Router } from '@/main/server/router.js'
import { FilesController } from './files-controller.js'

export function filesRoutes(router: Router) {
  router.http('get', '/file/:fileId', adaptRoute(new FilesController()))
}
