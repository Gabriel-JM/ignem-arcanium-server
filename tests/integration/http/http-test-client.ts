import http from 'http'
import https from 'https'
import { URL } from 'url'

interface HTTPRequestParams {
  url: string
  method?: string
  headers?: Record<string, string>
  body?: any
}

interface HTTPResponse {
  statusCode: number
  body: any
}

function parseData(data: any, type: string) {
  if (/^application\/json/.test(type)) {
    return JSON.parse(data.toString())
  }

  return data.toString()
}

export function httpRequest({
  url,
  method = 'get',
  headers = {},
  body
}: HTTPRequestParams): Promise<HTTPResponse> {
  const urlObj = new URL(url)

  const service = urlObj.protocol === 'https:' ? https : http
  
  const options = {
    method: String(method).toUpperCase(),
    hostname: urlObj.hostname,
    pathname: urlObj.pathname,
    port: urlObj.port ?? 443,
    headers,
  }

  return new Promise((resolve, reject) => {
    const httpRequest = service.request(options, response => {
      const dataArray: Buffer[] = []
      const statusCode = Number(response.statusCode)
      const contentType = response.headers['content-type']

      response.on('error', reject)

      response.on('data', responseData => dataArray.push(responseData))

      response.on('end', () => {
        const bodyData = parseData(
          Buffer.concat(dataArray),
          String(contentType)
        )

        resolve({
          statusCode,
          body: bodyData
        })
       })
    })

    httpRequest.on('error', reject)

    body && httpRequest.write(JSON.stringify(body))
    httpRequest.end()
  })
}
