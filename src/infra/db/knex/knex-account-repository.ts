import {
  CheckAccountByEmailRepository,
  CreateAccountRepository,
  CreateAccountRepositoryParams,
  FindAccountByEmailRepository,
  FindAccountByEmailRepositoryResult
} from '@/data/protocols/repository'
import { KnexHelper } from '@/infra/db/knex/knex-helper'

type Repository = CreateAccountRepository
  & FindAccountByEmailRepository
  & CheckAccountByEmailRepository

export class KnexAccountRepository implements Repository {
  tableName = 'accounts'

  constructor(private readonly knexHelper: KnexHelper) {}

  async checkByEmail(email: string): Promise<boolean> {
    const exists = await this.knexHelper
      .table(this.tableName)
      .select(this.knexHelper.conn.raw('1'))
      .where({ email })
      .first()

    return Boolean(exists)
  }

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
