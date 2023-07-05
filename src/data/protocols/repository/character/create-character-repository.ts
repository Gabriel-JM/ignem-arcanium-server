import { CreateCharacterParams } from '@/domain/usecases/index.ts'

export type CreateCharacterRepositoryParams = CreateCharacterParams & {
  id: string
  statusEffects: string[]
  hp: number
  mp: number
  inventorySpaceInUse: number
  equipment: {
    leftHand?: string
    rightHand?: string
    armor?: string
    accessory1?: string
    accessory2?: string
  }
}

export interface CreateCharacterRepository {
  create(params: CreateCharacterRepositoryParams): Promise<void>
}
