import knex from 'knex'
import path from 'path'

function connect() {
  return knex({
    client: 'sqlite3',
    connection: {
      filename: path.resolve('database', 'ignem-arcanium.db'),
      charset: 'utf8'
    },
    migrations: {
      extension: 'ts',
      directory: path.resolve('dist', 'database', 'migrations')
    },
    useNullAsDefault: true
  })
}

class KnexHelper {
  #knexConnection = connect()
  
  table(tableName: string) {
    return this.#knexConnection.table(tableName)
  }
}

const knexHelper = new KnexHelper()

export { knexHelper }
