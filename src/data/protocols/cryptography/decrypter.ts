export interface Decrypter {
  decrypt<T = unknown>(value: string): Promise<T | null>
}
