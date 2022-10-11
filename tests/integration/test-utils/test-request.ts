import chai from 'chai'
import { server } from '@/main/server/app.js'

export interface TestRequestParams {
  method: string
  path: string
  body?: object
}

export async function testRequest(params: TestRequestParams) {
  const chaiRequest = chai.request(server)

  if (params.method === 'post') {
    const response = await chaiRequest
      .post(params.path)
      .send(params.body)

    const body = JSON.parse(response.text)

    return { ...response, body }
  }

  throw new Error(`Method ${params.method} not implemented`)
}
