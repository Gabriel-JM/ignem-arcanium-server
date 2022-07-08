import { FindAllCharactersResult } from '@/domain/usecases'

export type FindAllCharactersRepositoryResult = FindAllCharactersResult

export interface FindAllCharactersRepository {
  findAll(accountId: string): Promise<FindAllCharactersRepositoryResult[]>
}
