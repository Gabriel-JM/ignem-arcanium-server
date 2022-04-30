export interface AccountLoginParams {
  email: string
  password: string
}

export interface AccountLoginResult {
  name: string
  token: string
}

export interface AccountLogin {
  login(params: AccountLoginParams): Promise<AccountLoginResult>
}
