import { makeAuthDecorator } from '@/account/main/factories/index.ts'
import { DbFindAllCharacters } from '@/data/usecases/index.ts'
import { ErrorHandlerControllerDecorator } from '@/main/decorators/index.ts'
import { makeKnexCharacterRepository } from '@/main/factories/repositories/index.ts'
import { GenericController } from '@/presentation/controllers/index.ts'

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
