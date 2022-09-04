import { DbCreateCharacter } from '@/data/usecases/index.js'
import { NanoIdUniqueIdGenerator } from '@/infra/identification/index.js'
import { applyErrorAndValidationDecorators, makeAuthDecorator } from '@/main/factories/decorators/index.js'
import { makeKnexCharacterRepository } from '@/main/factories/repositories/index.js'
import { makeCreateCharacterValidator } from '@/main/factories/validators/index.js'
import { GenericController } from '@/presentation/controllers/index.js'

export function makeCreateCharacterController() {
  const characterRepository = makeKnexCharacterRepository()
  const uniqueIdGenerator = new NanoIdUniqueIdGenerator()
  const dbCreateCharacter = new DbCreateCharacter(uniqueIdGenerator, characterRepository)

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
