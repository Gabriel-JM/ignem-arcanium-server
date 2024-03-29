import { makeAuthDecorator } from '@/account/main/factories/index.js'
import { DbFindAllCharacters } from '@/data/usecases/index.js'
import { ErrorHandlerControllerDecorator } from '@/main/decorators/index.js'
import { makeKnexCharacterRepository } from '@/main/factories/repositories/index.js'
import { GenericController } from '@/common/presentation/controllers/index.js'

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
