import { ServerResponse } from 'http'
import { RequestData } from '@/main/server/router'
import { Controller } from '@/presentation/protocols'
import { cors } from '@/main/server/cors'

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
