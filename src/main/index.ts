import 'dotenv-safe/config.js'
import { server } from './server/app.js'
import { knexConnection } from '@/main/factories/repositories/index.js'

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
    setTimeout(start, 1500)
  })
}

start()
