import { CreateCharacterParams } from '@/domain/usecases/index.js'

export type CreateCharacterRepositoryParams = CreateCharacterParams & {
  id: string
  statusEffects: string[]
  hp: number
  mp: number
}

export interface CreateCharacterRepository {
  create(params: CreateCharacterRepositoryParams): Promise<void>
}
