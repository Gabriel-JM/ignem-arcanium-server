import { Validator } from '@/common/validation/protocols/validator.ts'
import {
  ErrorHandlerControllerDecorator,
  ValidationControllerDecorator,
  validationControllerFNDecorator
} from '@/main/decorators/index.ts'
import { Controller, ControllerFN } from '@/presentation/protocols/index.ts'

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
