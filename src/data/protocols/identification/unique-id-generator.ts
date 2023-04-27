import { IDPrefixes } from '@/infra/identification/id-prefixes.js'

export interface UniqueIdGenerator {
  generate(prefixSubject: keyof typeof IDPrefixes): string
}
