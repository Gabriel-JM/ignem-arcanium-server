import {
  CreateAccountRepository,
  CreateAccountRepositoryParams,
  FindAccountByEmailRepository,
  FindAccountByEmailRepositoryResult
} from '@/data/protocols/repository'
import { KnexHelper } from '@/infra/db/knex/knex-helper'

type Repository = CreateAccountRepository & FindAccountByEmailRepository

export class KnexAccountRepository implements Repository {
  tableName = 'accounts'

  constructor(private readonly knexHelper: KnexHelper) {}

  async findByEmail(email: string): Promise<FindAccountByEmailRepositoryResult> {
    const account = await this.knexHelper
      .table(this.tableName)
      .select()
      .where({ email })
      .first<FindAccountByEmailRepositoryResult>()

    return account ?? null
  }
  
  async create(params: CreateAccountRepositoryParams): Promise<void> {
    await this.knexHelper.table(this.tableName).insert({
      id: params.id,
      name: params.name,
      email: params.email,
      password: params.password
    })
  }
}
