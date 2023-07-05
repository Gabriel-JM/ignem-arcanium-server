import { DbUpdateCharacter } from '@/data/usecases/index.ts'
import { applyErrorAndValidationDecorators } from '@/main/factories/decorators/index.ts'
import { makeKnexCharacterRepository } from '@/main/factories/repositories/index.ts'
import { makeUpdateCharacterValidator } from '@/main/factories/validators/index.ts'
import { GenericController } from '@/presentation/controllers/index.ts'

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
