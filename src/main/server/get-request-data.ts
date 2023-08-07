import busboy from 'busboy'
import { IncomingMessage } from 'node:http'

export function getRequestData(request: IncomingMessage) {
  const contentType = request.headers['content-type']

  if (contentType === 'application/json') {
    return parseJSONBody(request)
  }

  if (contentType?.startsWith('multipart/form-data')) {
    return parseFormDataBody(request)
  }

  return null
}

function parseJSONBody(request: IncomingMessage) {
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

function parseFormDataBody(request: IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      const boy = busboy({ headers: request.headers })

      const finalBody = {}

      boy
        .on('file', (name, file, info) => {
          const { filename, encoding, mimeType } = info

          file.on('data', data => {
            const currentData = Reflect.get(finalBody, name)

            if (!currentData) {
              Reflect.set(finalBody, name, {
                filename,
                encoding,
                mimeType,
                data
              })
              return
            }

            Reflect.set(currentData, 'data', Buffer.concat([
              currentData.data,
              data
            ]))
          })
        })
        .on('field', (name, value) => {
          Reflect.set(finalBody, name, value)
        })
        .on('finish', () => {
          resolve(finalBody)
        })

      request.pipe(boy)
    } catch(error) {
      reject(error)
    }
  })
}
