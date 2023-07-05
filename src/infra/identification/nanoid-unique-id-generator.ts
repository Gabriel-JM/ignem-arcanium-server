import { customAlphabet } from 'nanoid'
import { UniqueIdGenerator } from '@/data/protocols/identification/index.ts'
import { IDPrefixes } from '@/infra/identification/id-prefixes.ts'
import { InvalidIDPrefixSubject } from '@/infra/errors/index.ts'

export class NanoIdUniqueIdGenerator implements UniqueIdGenerator {
  static alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  static nanoId = customAlphabet(NanoIdUniqueIdGenerator.alphabet)

  generate(key: keyof typeof IDPrefixes) {

    if (!IDPrefixes[key]) {
      throw new InvalidIDPrefixSubject(key)
    }

    return IDPrefixes[key] + NanoIdUniqueIdGenerator.nanoId()
  }
}
