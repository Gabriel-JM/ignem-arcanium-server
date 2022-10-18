export interface UniqueIdGenerator {
  generate(prefixSubject: string): string
}
