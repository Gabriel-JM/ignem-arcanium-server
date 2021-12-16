import { HTTPResponse } from '@/presentation/protocols'

export interface Controller {
  handle(params: any): Promise<HTTPResponse>
}
