import {
  ErrorHandlerControllerDecorator,
  ValidationControllerDecorator
} from '@/main/decorators'
import { Controller } from '@/presentation/protocols'
import { Validator } from '@/validation/protocols'

export function applyErrorAndValidationDecorators(
  controller: Controller,
  validator: Validator
) {
  return new ErrorHandlerControllerDecorator(
    new ValidationControllerDecorator(validator, controller)
  )
}
