export interface CreateCharacterInventoryItem {
  itemId: string
  quantity: number
}

export interface CreateCharacterParams {
  accountId: string
  name: string
  gold: number
  icon: string
  level: number
  characterPoints: number
  alignment: string
  description?: string
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
  inventoryItems?: Array<CreateCharacterInventoryItem>
}

export interface CreateCharacterResult {
  id: string
}

export interface CreateCharacter {
  create(params: CreateCharacterParams): Promise<CreateCharacterResult>
}
