import { IDPrefixes } from '@/infra/identification/id-prefixes.ts'

export interface UniqueIdGenerator {
  generate(prefixSubject: keyof typeof IDPrefixes): string
}
