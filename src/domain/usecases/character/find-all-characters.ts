export interface FindAllCharactersParams {
  accountId: string
}

export interface FindAllCharactersResult {
  id: string
  accountId: string
  name: string
  gold: number
  icon: string
  level: number
  characterPoints: number
  alignment: string
  description: string
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}

export interface FindAllCharacters {
  findAll(params: FindAllCharactersParams): Promise<FindAllCharactersResult[]>
}
