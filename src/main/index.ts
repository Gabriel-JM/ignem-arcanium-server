import dotenv from 'dotenv-safe'

dotenv.config()

import { server } from './server/app.ts'

const port = process.env.PORT || 8000

console.log('Server in development...')

async function start() {
  await import('./config/prisma.ts')

  server.listen(port, () => console.log('Server running at ' + port))
}

start()
