import knex, { Knex } from 'knex'
import path from 'path'

export function connect() : Knex {
  const connection = process.env.DB_URL

  return knex({
    client: 'pg',
    connection,
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
