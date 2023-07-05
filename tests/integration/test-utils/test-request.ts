import chai from 'chai'
import { server } from '@/main/server/app.ts'

export interface TestRequestParams {
  method: string
  path: string
  headers?: Record<string, string>
  body?: object
}

export async function testRequest(params: TestRequestParams) {
  const chaiAgent = chai.request(server) as ChaiHttp.Agent & Record<string, any>

  if (!(params.method in chaiAgent)) {
    throw new Error(`Method ${params.method} not implemented`)
  }

  const chaiRequest = chaiAgent[params.method](params.path)

  if (params.headers) {
    chaiRequest.set(params.headers)
  }

  const response = await chaiRequest.send(params.body)

  const body = JSON.parse(response.text)

  return { ...response, body }
}
