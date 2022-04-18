import { CreateAccountRepository, CreateAccountRepositoryParams } from '@/data/protocols/repository'
import { KnexHelper } from '@/infra/db/knex/knex-helper'

export class KnexAccountRepository implements CreateAccountRepository {
  tableName = 'accounts'

  constructor(private readonly knexHelper: KnexHelper) {}
  
  async create(params: CreateAccountRepositoryParams): Promise<void> {
    await this.knexHelper.table(this.tableName).insert({
      id: params.id,
      name: params.name,
      email: params.email,
      password: params.password
    })
  }
}
