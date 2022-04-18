export interface TextHasher {
  hash(text: string): Promise<string>
}
