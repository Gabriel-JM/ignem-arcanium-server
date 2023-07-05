import { FindAllCharactersResult } from '@/domain/usecases/index.ts'

export type FindAllCharactersRepositoryResult = FindAllCharactersResult

export interface FindAllCharactersRepository {
  findAll(accountId: string): Promise<FindAllCharactersRepositoryResult[]>
}
