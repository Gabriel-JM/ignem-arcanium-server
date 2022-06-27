export interface UpdateCharacterParams {
  id: string
  accountId: string
  name?: string
  icon?: string
  level?: number
  gold?: number
  hp?: number
  mp?: number
  strength?: number
  dexterity?: number
  constitution?: number
  intelligence?: number
  wisdom?: number
  charism?: number
}

export interface UpdateCharacter {
  update(params: UpdateCharacterParams): Promise<void>
}
