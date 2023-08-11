import { HTTPResponse } from './index.js'

export interface Controller {
  handle(params: any): Promise<HTTPResponse>
}

export type ControllerFN = (params: any) => Promise<HTTPResponse>
