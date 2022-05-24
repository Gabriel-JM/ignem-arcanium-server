import { LoadAccountByTokenResult } from '@/domain/usecases'

export type FindAccountByIdRepositoryResult = null | LoadAccountByTokenResult

export interface FindAccountByIdRepository {
  findById(id: string): Promise<FindAccountByIdRepositoryResult>
}
