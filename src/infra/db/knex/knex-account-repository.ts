import {
  CheckAccountByEmailRepository,
  CreateAccountRepository,
  CreateAccountRepositoryParams,
  FindAccountByEmailRepository,
  FindAccountByEmailRepositoryResult,
  FindAccountByIdRepository,
  FindAccountByIdRepositoryResult
} from '@/data/protocols/repository/index.js'
import { KnexHelper } from '@/infra/db/knex/knex-helper.js'

type Repository = CreateAccountRepository
  & FindAccountByEmailRepository
  & CheckAccountByEmailRepository
  & FindAccountByIdRepository

export class KnexAccountRepository implements Repository {
  tableName = 'accounts'
  #knexHelper: KnexHelper

  constructor(knexHelper: KnexHelper) {
    this.#knexHelper = knexHelper
  }

  async checkByEmail(email: string): Promise<boolean> {
    const exists = await this.#knexHelper
      .table(this.tableName)
      .select(this.#knexHelper.conn.raw('1'))
      .where({ email })
      .first()

    return Boolean(exists)
  }

  async findById(id: string) {
    const accountData = await this.#knexHelper
      .table(this.tableName)
      .where({ id })
      .first<FindAccountByIdRepositoryResult>()

    return accountData ?? null
  }

  async findByEmail(email: string): Promise<FindAccountByEmailRepositoryResult> {
    const account = await this.#knexHelper
      .table(this.tableName)
      .select()
      .where({ email })
      .first<FindAccountByEmailRepositoryResult>()

    return account ?? null
  }
  
  async create(params: CreateAccountRepositoryParams): Promise<void> {
    await this.#knexHelper.table(this.tableName).insert({
      id: params.id,
      name: params.name,
      email: params.email,
      password: params.password
    })
  }
}
