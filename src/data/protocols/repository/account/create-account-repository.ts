export interface CreateAccountRepositoryParams {
  id: string
  name: string
  email: string
  password: string
}

export interface CreateAccountRepository {
  create(params: CreateAccountRepositoryParams): Promise<void>
}
