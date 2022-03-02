import 'dotenv-safe/config'
import 'module-alias/register'
import { server } from './server/app'
import { knexConnection } from '@/main/factories/repositories'

const port = process.env.PORT || 8000

console.log('Server in development...')

knexConnection.migrate.latest()
  .then(() => {
    server.listen(port, () => console.log('Server running at ' + port))
  })
  .catch(err => {
    console.log('Migrations error', err)
  })
