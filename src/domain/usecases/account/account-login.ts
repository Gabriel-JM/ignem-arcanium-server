export interface AccountLoginParams {
  email: string
  password: string
}

export interface AccountLogin {
  login(params: AccountLoginParams): Promise<string>
}
