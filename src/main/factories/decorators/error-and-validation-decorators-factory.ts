import { Validator } from '@/common/validation/protocols/validator.js'
import {
  ErrorHandlerControllerDecorator,
  ValidationControllerDecorator,
  validationControllerFNDecorator
} from '@/main/decorators/index.js'
import { Controller, ControllerFN } from '@/presentation/protocols/index.js'

export function applyErrorAndValidationDecorators(
  controller: Controller,
  validator: Validator
) {
  return new ErrorHandlerControllerDecorator(
    new ValidationControllerDecorator(validator, controller)
  )
}

export function applyErrorAndValidationFNDecorators(
  controller: ControllerFN,
  validator: Validator
) {
  return new ErrorHandlerControllerDecorator(
    validationControllerFNDecorator(controller, validator)
  )
}
