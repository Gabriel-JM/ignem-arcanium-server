export interface CreateCharacterRepositoryParams {
  id: string
  accountId: string
  name: string
  icon: string
  level: number
  gold: number
  hp: number
  mp: number
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charism: number
}

export interface CreateCharacterRepository {
  create(params: CreateCharacterRepositoryParams): Promise<void>
}
