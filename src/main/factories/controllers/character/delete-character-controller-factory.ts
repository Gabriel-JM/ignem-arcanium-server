import { makeAuthDecorator } from '@/account/main/factories/index.ts'
import { DbDeleteCharacter } from '@/data/usecases/index.ts'
import { ErrorHandlerControllerDecorator } from '@/main/decorators/index.ts'
import { makeKnexCharacterRepository } from '@/main/factories/repositories/index.ts'
import { GenericController } from '@/presentation/controllers/index.ts'

export function makeDeleteCharacterController() {
  const characterRepository = makeKnexCharacterRepository()
  const dbDeleteCharacter = new DbDeleteCharacter(characterRepository, characterRepository)
  
  return new ErrorHandlerControllerDecorator(
    makeAuthDecorator(
      new GenericController(
        dbDeleteCharacter.delete.bind(dbDeleteCharacter)
      )
    )
  )
}
