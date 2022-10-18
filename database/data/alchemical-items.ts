export function makeAlchemicalItems() {
  return [
    {
      itemId: 'ite_sHU3r-vjZJfR0z-m0wCyk',
      alchemicalItemId: 'alc_4r9Z1BkyB7PbVdNbnsDpj',
      name: 'Simple Healing Ointment',
      type: 'OINTMENT',
      rarity: 'UNCOMMON',
      description: 'A very light pink ointment with yellowish traces,'
        + ' which has a lighter regenerative effect and is simpler to produce.',
      effects: '2/3 turn regeneration.',
      brewPrice: 4,
      brewTime: '15 minutes',
      price: 8,
      weight: 2
    },
    {
      itemId: 'ite_mSOJrZMKi3aLezd2Icj6I',
      alchemicalItemId: 'alc_8wIpwzcq47j14ASjIWQ6z',
      name: 'Weak Arcane Oil',
      type: 'OIL',
      rarity: 'UNCOMMON',
      description: 'A vial of a dark purple oil with dark blue stains, which has'
        + ' an aggressive (non-elemental) magical effect that reflects on the'
        + ' target when hit.',
      effects: 'Adds 2 magic damage to a weapon that has a blade, for 5 turns.',
      brewPrice: 15,
      brewTime: '20 minutes',
      price: 30,
      weight: 2
    },
    {
      itemId: 'ite_M59NVQzkPY3bFvTkk8E3d',
      alchemicalItemId: 'alc_ihdxTdFT2a8dn48Cruglx',
      name: 'Weak Poisonous Oil',
      type: 'OIL',
      rarity: 'UNCOMMON',
      description: 'A vial of a weapon-specific oil mixed with a weaker poison,'
        + ' this oil has a gray, almost black color with light green flecks.'
        + ' The poison does not have an effect just by having contact with the'
        + ' skin, thanks to that the mixture with the oil and using it with a'
        + ' weapon is important.',
      effects: 'Adds poison effect to a weapon that has a blade, for 5 turns.'
        + ' The poison has a DC 7 against Constitution, and a damage rate of 2/3 turns.',
      brewPrice: 10,
      brewTime: '20 minutos',
      price: 22,
      weight: 2
    }
  ]
}
