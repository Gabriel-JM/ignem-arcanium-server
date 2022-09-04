import { nanoid } from 'nanoid'
import { UniqueIdGenerator } from '@/data/protocols/identification/index.js'

export class NanoIdUniqueIdGenerator implements UniqueIdGenerator {
  generate() {
    return nanoid()
  }
}
