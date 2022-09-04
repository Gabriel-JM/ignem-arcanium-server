import { DbListAllCommonItems } from '@/data/usecases/index.js'
import { KnexHelper } from '@/infra/db/knex/knex-helper.js'
import { KnexItemRepository } from '@/infra/db/knex/knex-item-repository.js'
import { ErrorHandlerControllerDecorator } from '@/main/decorators/index.js'
import { knexConnection } from '@/main/factories/repositories/index.js'
import { GenericController } from '@/presentation/controllers/index.js'

export function makeListAllCommonItemsController() {
  const knexHelper = new KnexHelper(knexConnection)
  const knexItemRepository = new KnexItemRepository(knexHelper)
  const listAllCommonItems = new DbListAllCommonItems(knexItemRepository)
  const controller = new GenericController(
    listAllCommonItems.listAll.bind(listAllCommonItems)
  )

  return new ErrorHandlerControllerDecorator(
    controller
  )
}
