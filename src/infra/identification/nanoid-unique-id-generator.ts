import { nanoid } from 'nanoid'
import { UniqueIdGenerator } from '@/data/protocols/identification/index.js'
import { IDPrefixes } from '@/infra/identification/id-prefixes.js'
import { InvalidIDPrefixSubject } from '@/infra/errors/index.js'

export class NanoIdUniqueIdGenerator implements UniqueIdGenerator {
  generate(prefixSubject: string) {
    const key = prefixSubject as keyof typeof IDPrefixes

    if (!IDPrefixes[key]) {
      throw new InvalidIDPrefixSubject(prefixSubject)
    }

    return IDPrefixes[key] + nanoid()
  }
}
