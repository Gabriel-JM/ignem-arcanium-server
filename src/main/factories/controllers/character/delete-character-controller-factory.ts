import { DbDeleteCharacter } from '@/data/usecases'
import { ErrorHandlerControllerDecorator } from '@/main/decorators'
import { makeKnexCharacterRepository } from '@/main/factories/repositories'
import { GenericController } from '@/presentation/controllers'

export function makeDeleteCharacterController() {
  const characterRepository = makeKnexCharacterRepository()
  const dbDeleteCharacter = new DbDeleteCharacter(characterRepository, characterRepository)
  
  return new ErrorHandlerControllerDecorator(
    new GenericController(
      dbDeleteCharacter.delete.bind(dbDeleteCharacter)
    )
  )
}
