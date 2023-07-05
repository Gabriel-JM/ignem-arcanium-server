import { makeAuthDecorator } from '@/account/main/factories/index.ts'
import { DbCreateCharacter } from '@/data/usecases/index.ts'
import { KnexCreateCharacterRepository } from '@/infra/db/knex/character/knex-create-character-repository.ts'
import { KnexItemRepository } from '@/infra/db/knex/knex-item-repository.ts'
import { NanoIdUniqueIdGenerator } from '@/infra/identification/index.ts'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators/index.ts'
import { makeKnexHelper } from '@/main/factories/repositories/index.ts'
import { makeKnexRepository } from '@/main/factories/repositories/knex-repository.ts'
import { makeCreateCharacterValidator } from '@/main/factories/validators/index.ts'
import { CreateCharacterController } from '@/presentation/controllers/index.ts'

export function makeCreateCharacterController() {
  const uniqueIdGenerator = new NanoIdUniqueIdGenerator()
  const itemRepository = makeKnexRepository(KnexItemRepository)
  const characterRepository = new KnexCreateCharacterRepository(makeKnexHelper(), uniqueIdGenerator)
  const dbCreateCharacter = new DbCreateCharacter(
    uniqueIdGenerator,
    itemRepository,
    itemRepository,
    characterRepository
  )

  const controller = makeAuthDecorator(
    new CreateCharacterController(dbCreateCharacter)
  )

  return applyErrorAndValidationDecorators(
    controller,
    makeCreateCharacterValidator()
  )
}
