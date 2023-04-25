import { customAlphabet } from 'nanoid'
import { UniqueIdGenerator } from '@/data/protocols/identification/index.js'
import { IDPrefixes } from '@/infra/identification/id-prefixes.js'
import { InvalidIDPrefixSubject } from '@/infra/errors/index.js'

export class NanoIdUniqueIdGenerator implements UniqueIdGenerator {
  static alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  static nanoId = customAlphabet(NanoIdUniqueIdGenerator.alphabet)

  generate(prefixSubject: string) {
    const key = prefixSubject as keyof typeof IDPrefixes

    if (!IDPrefixes[key]) {
      throw new InvalidIDPrefixSubject(prefixSubject)
    }

    return IDPrefixes[key] + NanoIdUniqueIdGenerator.nanoId()
  }
}
