import 'dotenv-safe/config.js'
import { server } from './server/app.js'

const port = process.env.PORT || 8000

console.log('Server in development...')

async function start() {
  await import('./config/prisma.js')

  server.listen(port, () => console.log('Server running at ' + port))
}

start()
