function generateDamageReduction(value: string) {
  return {
    slash: value,
    pierce: value,
    strike: value
  }
}

export function makeShieldsAndArmors() {
  return [
    {
      itemId: 'JV8iZQJdMmJby0tL7BeNR',
      shieldArmorId: 'DCB7QZBz9vYshdHYrKMkh',
      name: 'Cloth',
      type: 'ARMOR',
      description: 'Simple cloths not made to be protective',
      damageReduction: '{}',
      properties: '["LIGHT"]',
      initiativeModifier: 0,
      price: 8,
      weight: 5
    },
    {
      itemId: '8twjG-MtlmO3HR0nnzzKM',
      shieldArmorId: '5VNaHOhpluPnWQ363KeZH',
      name: 'Leather Armor',
      type: 'ARMOR',
      description: 'Light weight armor made of animal leather',
      damageReduction: generateDamageReduction('1'),
      properties: '["LIGHT"]',
      initiativeModifier: 0,
      price: 35,
      weight: 50
    },
    {
      itemId: '8U_lwxzl_8tM6YG3K_ieM',
      shieldArmorId: 'GPZlWtN78VlM2ZUUI1DXh',
      name: 'Light Scale Armor',
      type: 'ARMOR',
      description: 'Light weight armor made of criatures hard scales',
      damageReduction: generateDamageReduction('3'),
      properties: '["LIGHT"]',
      initiativeModifier: 0,
      price: 120,
      weight: 65
    },
    {
      itemId: 'Gxu930pPr0rtMUPQynAJJ',
      shieldArmorId: '4cGqVz-OVgpRStQAxDgNk',
      name: 'Bronze Breastplate',
      type: 'ARMOR',
      description: 'A breastplate armor made of bronze',
      damageReduction: generateDamageReduction('2'),
      properties: '["HEAVY_1"]',
      initiativeModifier: -1,
      price: 35,
      weight: 80
    },
    {
      itemId: 'fz95ObDXAltpuMVdnZVVM',
      shieldArmorId: 'iSUlnXDTEejN55jtXOyCI',
      name: 'Chain Mail',
      type: 'ARMOR',
      description: 'An armor made of small circles of metal',
      damageReduction: generateDamageReduction('3'),
      properties: '["HEAVY_1"]',
      initiativeModifier: -1,
      price: 50,
      weight: 100
    },
    {
      itemId: 'mKomcIeswDG-do1VeI8cd',
      shieldArmorId: '-Km1dyRk6Qq1bIrfL4NdH',
      name: 'Iron Armor',
      type: 'ARMOR',
      description: 'A classic armor for good defense in combat',
      damageReduction: generateDamageReduction('4'),
      properties: '["HEAVY_2","RESISTANT"]',
      initiativeModifier: -2,
      price: 65,
      weight: 110
    },
    {
      itemId: 'gOTWaPBqho1DSQJ3O2bfw',
      shieldArmorId: 'Gonb3ZenznaSgLvnVhcjg',
      name: 'Steel Armor',
      type: 'ARMOR',
      description: 'A full plate armor made of steel',
      damageReduction: generateDamageReduction('5'),
      properties: '["HEAVY_2","RESISTANT"]',
      initiativeModifier: -2,
      price: 80,
      weight: 125
    },
    {
      itemId: 'V1XSADM4r-bpZlePcafIG',
      shieldArmorId: 'O64ljgAcrBsg9WMz2lPeu',
      name: 'Steel Laminated Armor',
      type: 'ARMOR',
      description: 'A really well made and strutured laminated steel armor',
      damageReduction: generateDamageReduction('6'),
      properties: '["HEAVY_3","RESISTANT"]',
      initiativeModifier: -3,
      price: 100,
      weight: 140
    },
    {
      itemId: 'Lbnjq6LwAdekbtEvSu1Ke',
      shieldArmorId: 'hU3x0Ctlb4_L0vd-ytl4l',
      name: 'Buckler',
      type: 'SHIELD',
      description: 'A small shield made of leather and/or wood good for parrying',
      damageReduction: generateDamageReduction('STR+2'),
      properties: '["LIGHT"]',
      initiativeModifier: 0,
      price: 12,
      weight: 30
    },
    {
      itemId: '_-V-OtKEEhTGBJ0gtR61Y',
      shieldArmorId: 'XPQtZjpxkxjl_fric7TH9',
      name: 'Round Shield',
      type: 'SHIELD',
      description: 'A classic shield used by light weight warriors',
      damageReduction: generateDamageReduction('STR+4'),
      properties: '["LIGHT"]',
      initiativeModifier: 0,
      price: 24,
      weight: 50
    },
    {
      itemId: 'cA0qYnUR1YiLUiTub0Uav',
      shieldArmorId: '-K5v6OXFhEiruy6Y5ShQ3',
      name: 'Medium Shield',
      type: 'SHIELD',
      description: 'Shield used by knights and front line warriors',
      damageReduction: generateDamageReduction('STR+6'),
      properties: '["HEAVY"]',
      initiativeModifier: -1,
      price: 50,
      weight: 80
    },
    {
      itemId: '3ewCFUioD0q6V7O8ZqK6d',
      shieldArmorId: 'LapqUdL0lHd2uFfGjtM91',
      name: 'Greatshield',
      type: 'SHIELD',
      description: 'Shields that are so big that can cover a person and be used as wall',
      damageReduction: generateDamageReduction('STR+8'),
      properties: '["HEAVY"]',
      initiativeModifier: -2,
      price: 80,
      weight: 120
    }
  ]
}
