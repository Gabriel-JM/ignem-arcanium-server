import { ListAllCommonItemsRepository } from '@/data/protocols/repository'
import { ListAllCommonItemsResult } from '@/domain/usecases'
import { KnexHelper } from '@/infra/db/knex/knex-helper'

export class KnexItemRepository implements ListAllCommonItemsRepository {
  constructor(private readonly knexHelper: KnexHelper) {}
  
  async listAllCommon(): Promise<ListAllCommonItemsResult> {
    const consumablesAndTools = await this.knexHelper
      .table('items')
      .whereIn('type', ['CONSUMABLE', 'TOOL'])

    const weapons = await this.knexHelper
      .table('items')
      .select(
        'id as weapons.id'
      )
      .join('weapons', 'weapons.item_id', 'items.id')

    const shieldsAndArmors = await this.knexHelper
      .table('items')
      .join('shields_armors', 'shields_armors.item_id', 'items.id')

    return [
      ...consumablesAndTools,
      ...weapons,
      ...shieldsAndArmors
    ]
  }
}