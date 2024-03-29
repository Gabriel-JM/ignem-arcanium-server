import { makeAuthDecorator } from '@/account/main/factories/index.js'
import { DbDeleteCharacter } from '@/data/usecases/index.js'
import { ErrorHandlerControllerDecorator } from '@/main/decorators/index.js'
import { makeKnexCharacterRepository } from '@/main/factories/repositories/index.js'
import { GenericController } from '@/common/presentation/controllers/index.js'

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
