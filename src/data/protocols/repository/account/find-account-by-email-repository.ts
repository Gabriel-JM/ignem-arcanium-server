export type FindAccountByEmailRepositoryResult = null | {
  id: string
  name: string
  email: string
  password: string
}

export interface FindAccountByEmailRepository {
  findByEmail(email: string): Promise<FindAccountByEmailRepositoryResult>
}
