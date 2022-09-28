export interface UpdateCharacterParams {
  id: string
  accountId: string
  name?: string
  alignment?: string
  icon?: string
  level?: number
  gold?: number
  statusEffects?: string[]
  experience?: number
  characterPoints?: number
  hp?: number
  mp?: number
  strength?: number
  dexterity?: number
  constitution?: number
  intelligence?: number
  wisdom?: number
  charisma?: number
  description?: string
}

export interface UpdateCharacter {
  update(params: UpdateCharacterParams): Promise<void>
}
