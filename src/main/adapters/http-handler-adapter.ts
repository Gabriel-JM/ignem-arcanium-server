import { ServerResponse } from 'node:http'
import { RequestData } from '@/main/server/router.ts'
import { Controller, ControllerFN } from '@/presentation/protocols/index.ts'
import { cors } from '@/main/server/cors.ts'

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

export function adaptRouteFN(controllerFn: ControllerFN) {
  return async (req: RequestData, res: ServerResponse) => {
    const data = {
      ...req.body,
      ...req.headers,
      ...req.params,
      ...req.queryParams
    }

    const response = await controllerFn(data)

    cors(res)
    res.statusCode = response.statusCode
    res.end(JSON.stringify(response.body))
  }
}
