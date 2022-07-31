import { DbListAllCommonItems } from '@/data/usecases'
import { KnexHelper } from '@/infra/db/knex/knex-helper'
import { KnexItemRepository } from '@/infra/db/knex/knex-item-repository'
import { ErrorHandlerControllerDecorator } from '@/main/decorators'
import { knexConnection } from '@/main/factories/repositories'
import { GenericController } from '@/presentation/controllers'

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
