export interface DeleteCharacterRepositoryParams {
  id: string
  accountId: string
}

export interface DeleteCharacterRepository {
  delete(params: DeleteCharacterRepositoryParams): Promise<void>
}
