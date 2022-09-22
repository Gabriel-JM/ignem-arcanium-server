import { EquipementSlotErrors } from '@/domain/entities/equipment.js'

export class InvalidEquipmentsError extends Error {
  name = 'InvalidEquipmentError'
  type = 'BusinessRule'
  details: EquipementSlotErrors

  constructor(equipmentErrors: EquipementSlotErrors) {
    super('Invalid equipments')
    this.details = equipmentErrors
  }
}
