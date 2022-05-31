export interface Encrypter {
  encrypt(data: Record<string, unknown>): Promise<string>
}
