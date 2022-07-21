export interface CreateCharacterRepositoryParams {
  id: string
  inventoryId: string
  accountId: string
  name: string
  icon: string
  level: number
  characterPoints: number
  alignment: string
  description?: string
  gold: number
  hp: number
  mp: number
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}

export interface CreateCharacterRepository {
  create(params: CreateCharacterRepositoryParams): Promise<void>
}
