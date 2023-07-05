import { EquipementSlotErrors } from '@/domain/entities/index.ts'

export class InvalidEquipmentsError extends Error {
  name = 'InvalidEquipmentError'
  type = 'BusinessRule'
  details: string[]

  constructor(equipmentErrors: EquipementSlotErrors) {
    super('Invalid equipments')
    this.details = equipmentErrors.map(err => {
      return `'${err.item.name}' cannot be equipped in ${err.slot}`
    })
  }
}
