export interface VerifyTokenParams {
  token: string
}

export interface VerifyToken {
  verify(params: VerifyTokenParams): void
}
