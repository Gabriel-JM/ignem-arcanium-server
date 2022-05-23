export interface LoadAccountByTokenResult {
  id: string
  name: string
  email: string
  password: string
}

export interface LoadAccountByToken {
  load(token: string): Promise<LoadAccountByTokenResult>
}
