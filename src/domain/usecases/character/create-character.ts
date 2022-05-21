export interface CreateCharacterParams {
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

export interface CreateCharacterResult {
  id: string
}

export interface CreateCharacter {
  create(params: CreateCharacterParams): Promise<CreateCharacterResult>
}
