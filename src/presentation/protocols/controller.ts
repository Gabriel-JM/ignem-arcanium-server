import { HTTPResponse } from '@/presentation/protocols/index.js'

export interface Controller {
  handle(params: any): Promise<HTTPResponse>
}
