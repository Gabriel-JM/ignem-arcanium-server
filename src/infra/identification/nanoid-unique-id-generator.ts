import { nanoid } from 'nanoid'
import { UniqueIdGenerator } from '@/data/protocols/identification'

export class NanoIdUniqueIdGenerator implements UniqueIdGenerator {
  generate() {
    return nanoid()
  }
}
