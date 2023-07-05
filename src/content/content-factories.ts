import { applyErrorAndValidationDecorators } from '@/main/factories/decorators/error-and-validation-decorators-factory.ts'
import { ContentController } from './content-controller.ts'
import { ContentRepository } from './content-repository.ts'
import { NanoIdUniqueIdGenerator } from '@/infra/identification/nanoid-unique-id-generator.ts'
import { ValidatorComposite } from '@/common/validation/composites/validator-composite.ts'
import { FieldsValidationComposite } from '@/common/validation/composites/fields-validation-composite.ts'
import { makeAuthDecorator } from '@/account/main/factories/auth.ts'
import { ErrorHandlerControllerDecorator } from '@/main/decorators/error-handler-controller-decorator.ts'
import { prisma } from '@/main/config/prisma.ts'

export function makeContentController() {
  const contentController = new ContentController(
    new ContentRepository(
      prisma,
      new NanoIdUniqueIdGenerator()
    )
  )

  const create = applyErrorAndValidationDecorators(
    makeAuthDecorator({
      handle: contentController.create.bind(contentController)
    }),
    makeCreateContentValidator()
  )

  const findByAccount = new ErrorHandlerControllerDecorator(
    makeAuthDecorator({
      handle: contentController.findByAccount.bind(contentController)
    })
  )

  return {
    findByAccount,
    create
  }
}

function makeCreateContentValidator() {
  return new ValidatorComposite(
    new FieldsValidationComposite({
      type: 'string',
      icon: 'string?',
      cover: 'string?',
      title: 'string',
      value: 'string',
      properties: 'object'
    })
  )
}
