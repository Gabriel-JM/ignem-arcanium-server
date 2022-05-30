import { DbFindAllCharacters } from '@/data/usecases'
import { ErrorHandlerControllerDecorator } from '@/main/decorators'
import { makeAuthDecorator } from '@/main/factories/decorators'
import { makeKnexCharacterRepository } from '@/main/factories/repositories'
import { GenericController } from '@/presentation/controllers'

export function makeFindAllCharactersController() {
  const knexCharacterRepository = makeKnexCharacterRepository()
  const dbFindAllCharacters = new DbFindAllCharacters(knexCharacterRepository)

  const controller = new GenericController(
    dbFindAllCharacters.findAll.bind(dbFindAllCharacters)
  )

  return new ErrorHandlerControllerDecorator(
    makeAuthDecorator(controller)
  )
}
