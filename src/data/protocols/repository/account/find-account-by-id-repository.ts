import { LoadAccountByTokenResult } from '@/domain/usecases/index.js'

export type FindAccountByIdRepositoryResult = null | LoadAccountByTokenResult

export interface FindAccountByIdRepository {
  findById(id: string): Promise<FindAccountByIdRepositoryResult>
}
