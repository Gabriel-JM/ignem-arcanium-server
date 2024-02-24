import 'dotenv-safe/config.js'
import { server } from './server/app.js'
import { knexConnection } from './factories/repositories/knex-connection.js'

const port = process.env.PORT || 8000

console.log('Server in development...')

knexConnection
  .migrate
  .latest()
  .then(() => {
    server.listen(
      port,
      () => console.log('Server running http://localhost:' + port)
    )
  })
  .catch(error => console.log('Migration Init error', error))
