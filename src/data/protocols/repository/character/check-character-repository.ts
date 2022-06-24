export interface CheckCharacterRepositoryParams {
  id: string
  accountId: string
}

export interface CheckCharacterRepository {
  check(params: CheckCharacterRepositoryParams): Promise<boolean>
}
