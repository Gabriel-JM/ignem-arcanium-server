import 'dotenv-safe/config'
import 'module-alias/register'
import { server } from './server/app'
import { knexConnection } from '@/main/factories/repositories'

const port = process.env.PORT || 8000

console.log('Server in development...')

let retries = 5

function start() {
  knexConnection.migrate.latest()
  .then(() => {
    server.listen(port, () => console.log('Server running at ' + port))
  })
  .catch(err => {
    if (retries == 0) {
      return console.log('Migrations error', err)
    }

    retries--
    console.log('Retrying... retries left:', retries)
    setTimeout(start, 500)
  })
}

start()
