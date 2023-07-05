import { ShieldOrArmor, Weapon } from '@/domain/interfaces/index.ts'

interface TwoHandsInUseErrorProps {
  field: string
  twoHandsWeapon: Weapon
  extraWeapon: Weapon | ShieldOrArmor
}

export class TwoHandsInUseError extends Error {
  name = 'HandInUseError'
  type = 'BusinessRule'

  constructor(readonly props: TwoHandsInUseErrorProps) {
    const { field, twoHandsWeapon, extraWeapon } = props
    super(
      `Cannot equip ${extraWeapon.name}, ${twoHandsWeapon.name} need two hands and is equipped in ${field}`
    )
  }
}
