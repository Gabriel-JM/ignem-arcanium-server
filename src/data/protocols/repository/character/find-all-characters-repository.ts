import { FindAllCharactersResult } from '@/domain/usecases/index.js'

export type FindAllCharactersRepositoryResult = FindAllCharactersResult

export interface FindAllCharactersRepository {
  findAll(accountId: string): Promise<FindAllCharactersRepositoryResult[]>
}
