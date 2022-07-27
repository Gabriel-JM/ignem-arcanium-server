import { AlchemicalItem, Gem, Item, ShieldOrArmor, Weapon } from '@/domain/interfaces'

export type ListAllCommonItemsResult = Array<
  | Item
  | Weapon
  | ShieldOrArmor
  | AlchemicalItem
  | Gem
>

export interface ListAllCommonItems {
  listAll(): Promise<ListAllCommonItemsResult>
}
