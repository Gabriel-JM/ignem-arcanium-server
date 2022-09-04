import { ServerResponse } from 'http'
import { RequestData } from '@/main/server/router.js'
import { Controller } from '@/presentation/protocols/index.js'
import { cors } from '@/main/server/cors.js'

export function adaptRoute(controller: Controller) {
  return async (req: RequestData, res: ServerResponse) => {
    const data = {
      ...req.body,
      ...req.headers,
      ...req.params,
      ...req.queryParams
    }

    const response = await controller.handle(data)

    cors(res)
    res.statusCode = response.statusCode
    res.end(JSON.stringify(response.body))
  }
}
