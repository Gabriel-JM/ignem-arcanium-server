import { ServerResponse } from 'http'
import { RequestData } from '@/main/server/router'
import { Controller } from '@/presentation/protocols'

export function adaptRoute(controller: Controller) {
  return async (req: RequestData, res: ServerResponse) => {
    const data = {
      ...req.body,
      ...req.params,
      ...req.queryParams
    }

    const response = await controller.handle(data)

    res.statusCode = response.statusCode
    res.end(JSON.stringify(response.body))
  }
}
