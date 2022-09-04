import { DbUpdateCharacter } from '@/data/usecases/index.js'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators/index.js'
import { makeKnexCharacterRepository } from '@/main/factories/repositories/index.js'
import { makeUpdateCharacterValidator } from '@/main/factories/validators/index.js'
import { GenericController } from '@/presentation/controllers/index.js'

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
