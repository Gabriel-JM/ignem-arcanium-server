import { applyErrorAndValidationFNDecorators } from '@/main/factories/decorators/error-and-validation-decorators-factory.js'
import { ContentController } from './content-controller.js'
import { ContentRepository } from './content-repository.js'
import { makeKnexHelper } from '@/main/factories/repositories/knex-helper-factory.js'
import { NanoIdUniqueIdGenerator } from '@/infra/identification/nanoid-unique-id-generator.js'
import { ValidatorComposite } from '@/common/validation/composites/validator-composite.js'
import { FieldsValidationComposite } from '@/common/validation/composites/fields-validation-composite.js'
import { RegexValidator } from '@/common/validation/validators/regex-validator.js'

export function makeContentController() {
  const contentController = new ContentController(
    new ContentRepository(
      makeKnexHelper(),
      new NanoIdUniqueIdGenerator()
    )
  )

  const create = applyErrorAndValidationFNDecorators(
    contentController.create.bind(contentController),
    makeCreateContentValidator()
  )

  return {
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
    }),
    new RegexValidator({
      icon: /http(s?):\/\/[\w\.]+\.\w{2,}/,
      cover: /http(s?):\/\/[\w\.]+\.\w{2,}/
    })
  )
}
