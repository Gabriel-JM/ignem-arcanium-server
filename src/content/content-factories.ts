import { applyErrorAndValidationDecorators } from '@/main/factories/decorators/error-and-validation-decorators-factory.js'
import { ContentController } from './content-controller.js'
import { ContentRepository } from './content-repository.js'
import { NanoIdUniqueIdGenerator } from '@/infra/identification/nanoid-unique-id-generator.js'
import { ValidatorComposite } from '@/common/validation/composites/validator-composite.js'
import { FieldsValidationComposite } from '@/common/validation/composites/fields-validation-composite.js'
import { makeAuthDecorator } from '@/account/main/factories/auth.js'
import { ErrorHandlerControllerDecorator } from '@/main/decorators/error-handler-controller-decorator.js'
import { prisma } from '@/main/config/prisma.js'
import { makeLocalFileUploader } from '@/common/factories/file-uploaders-factories.js'

export function makeContentController() {
  const contentController = new ContentController(
    new ContentRepository(
      prisma,
      new NanoIdUniqueIdGenerator()
    ),
    makeLocalFileUploader()
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
      icon: 'object?',
      cover: 'object?',
      title: 'string',
      value: 'string',
      properties: 'object'
    })
  )
}
