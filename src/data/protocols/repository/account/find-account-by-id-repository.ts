export type FindAccountByIdRepositoryResult = null | {
  id: string
  name: string
  email: string
  password: string
}

export interface FindAccountByIdRepository {
  findById(id: string): Promise<FindAccountByIdRepositoryResult>
}
