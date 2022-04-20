import { IncomingMessage } from 'http'

export function getRequestData(request: IncomingMessage) {
  return new Promise(async (resolve, reject) => {
    try {
      const requestData = []
  
      for await (const data of request) {
        requestData.push(data)
      }

      if (!requestData.length) return resolve({})

      const body = Buffer.concat(requestData).toString()

      resolve(JSON.parse(body))
    } catch(error) {
      reject(error)
    }
  })
}
