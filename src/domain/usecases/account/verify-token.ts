export interface VerifyToken {
  verify(token: string): Promise<void>
}
