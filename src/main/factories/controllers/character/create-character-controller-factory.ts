import { DbCreateCharacter } from '@/data/usecases/index.js'
import { KnexItemRepository } from '@/infra/db/knex/knex-item-repository.js'
import { NanoIdUniqueIdGenerator } from '@/infra/identification/index.js'
import { applyErrorAndValidationDecorators, makeAuthDecorator } from '@/main/factories/decorators/index.js'
import { makeKnexCharacterRepository } from '@/main/factories/repositories/index.js'
import { makeKnexRepository } from '@/main/factories/repositories/knex-repository.js'
import { makeCreateCharacterValidator } from '@/main/factories/validators/index.js'
import { GenericController } from '@/presentation/controllers/index.js'

export function makeCreateCharacterController() {
  const uniqueIdGenerator = new NanoIdUniqueIdGenerator()
  const itemRepository = makeKnexRepository(KnexItemRepository)
  const characterRepository = makeKnexCharacterRepository()
  const dbCreateCharacter = new DbCreateCharacter(
    uniqueIdGenerator,
    itemRepository,
    itemRepository,
    characterRepository
  )

  const controller = makeAuthDecorator(
    new GenericController(
      dbCreateCharacter.create.bind(dbCreateCharacter)
    )
  )

  return applyErrorAndValidationDecorators(
    controller,
    makeCreateCharacterValidator()
  )
}
