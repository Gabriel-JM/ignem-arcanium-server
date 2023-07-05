import { DbListAllCommonItems } from '@/data/usecases/index.ts'
import { KnexHelper } from '@/infra/db/knex/knex-helper.ts'
import { KnexItemRepository } from '@/infra/db/knex/knex-item-repository.ts'
import { ErrorHandlerControllerDecorator } from '@/main/decorators/index.ts'
import { knexConnection } from '@/main/factories/repositories/index.ts'
import { GenericController } from '@/presentation/controllers/index.ts'

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
