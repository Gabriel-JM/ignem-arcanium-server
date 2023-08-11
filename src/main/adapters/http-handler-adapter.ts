import { ServerResponse } from 'http'
import { RequestData } from '@/main/server/router.js'
import { cors } from '@/main/server/cors.js'
import { Controller, ControllerFN } from '@/common/presentation/protocols/index.js'

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
    
    if (response.headers) {
      res.writeHead(response.statusCode, response.headers)
      res.end(response.body)
      return
    }
    
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

    if (response.headers) {
      res.writeHead(response.statusCode, response.headers)
    }

    res.end(JSON.stringify(response.body))
  }
}
