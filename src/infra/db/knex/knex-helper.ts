import knex, { Knex } from 'knex'
import path from 'path'

export function connect() {
  return knex({
    client: 'better-sqlite3',
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

export class KnexHelper {

  constructor(private readonly knexConnection: Knex) {}
  
  table(tableName: string) {
    return this.knexConnection.table(tableName)
  }

  async transaction(transactionCallback: (trx: Knex.Transaction) => Promise<Knex | void>) {
    const knexTransaction = await this.knexConnection.transaction()
    
    try {
      await transactionCallback(knexTransaction)

      return await knexTransaction.commit()
    } catch (err) {
      await knexTransaction.rollback()
      throw err
    }
  }
}
