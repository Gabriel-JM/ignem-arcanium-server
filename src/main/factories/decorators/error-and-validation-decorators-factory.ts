import { Validator } from '@/common/validation/protocols/validator.js'
import {
  ErrorHandlerControllerDecorator,
  ValidationControllerDecorator
} from '@/main/decorators/index.js'
import { Controller } from '@/presentation/protocols/index.js'

export function applyErrorAndValidationDecorators(
  controller: Controller,
  validator: Validator
) {
  return new ErrorHandlerControllerDecorator(
    new ValidationControllerDecorator(validator, controller)
  )
}
