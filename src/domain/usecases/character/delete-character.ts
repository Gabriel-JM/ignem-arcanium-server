export interface DeleteCharacterParams {
  id: string
  accountId: string
}

export interface DeleteCharacter {
  delete(params: DeleteCharacterParams): Promise<void>
}
