import { DbCreateCharacter } from '@/data/usecases'
import { NanoIdUniqueIdGenerator } from '@/infra/identification'
import { applyErrorAndValidationDecorators, makeAuthDecorator } from '@/main/factories/decorators'
import { makeKnexCharacterRepository } from '@/main/factories/repositories'
import { makeCreateCharacterValidator } from '@/main/factories/validators'
import { GenericController } from '@/presentation/controllers'

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
