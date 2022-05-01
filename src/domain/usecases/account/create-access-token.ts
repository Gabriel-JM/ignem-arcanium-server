export interface CreateAccessToken {
  create(accountId: string): Promise<string>
}
