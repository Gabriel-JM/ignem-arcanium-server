import { Router } from '@/main/server/router'

export function cors(router: Router) {
  router.http('options', '/', (_, res) => {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': process.env.CLIENT_URL,
      'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,DELETE',
      'Access-Control-Max-Age': '86400'
    })
    res.end()
  })
}
