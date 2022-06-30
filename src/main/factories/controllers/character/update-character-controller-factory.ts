import { DbUpdateCharacter } from '@/data/usecases'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators'
import { makeKnexCharacterRepository } from '@/main/factories/repositories'
import { makeUpdateCharacterValidator } from '@/main/factories/validators'
import { GenericController } from '@/presentation/controllers'

export function makeUpdateCharacterController() {
  const characterRepository = makeKnexCharacterRepository()
  const dbUpdateCharacter = new DbUpdateCharacter(characterRepository)
  const controller = new GenericController(
    dbUpdateCharacter.update.bind(dbUpdateCharacter)
  )

  return applyErrorAndValidationDecorators(
    controller,
    makeUpdateCharacterValidator()
  )
}
