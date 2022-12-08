import { ArmorSubTypes, ItemTypes, ShieldSubTypes } from '../constants/items.js'

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
      itemId: 'ite_JV8iZQJdMmJby0tL7BeNR',
      shieldArmorId: 'sha_DCB7QZBz9vYshdHYrKMkh',
      name: 'Cloth',
      type: ItemTypes.armor,
      subType: ArmorSubTypes.cloth,
      description: 'Simple cloths not made to be protective',
      damageReduction: '{}',
      properties: '["LIGHT"]',
      initiativeModifier: 0,
      price: 8,
      weight: 5
    },
    {
      itemId: 'ite_8twjG-MtlmO3HR0nnzzKM',
      shieldArmorId: 'sha_5VNaHOhpluPnWQ363KeZH',
      name: 'Leather Armor',
      type: ItemTypes.armor,
      subType: ArmorSubTypes.lightArmor,
      description: 'Light weight armor made of animal leather',
      damageReduction: generateDamageReduction('1'),
      properties: '["LIGHT"]',
      initiativeModifier: 0,
      price: 35,
      weight: 50
    },
    {
      itemId: 'ite_8U_lwxzl_8tM6YG3K_ieM',
      shieldArmorId: 'sha_GPZlWtN78VlM2ZUUI1DXh',
      name: 'Light Scale Armor',
      type: ItemTypes.armor,
      subType: ArmorSubTypes.lightArmor,
      description: 'Light weight armor made of criatures hard scales',
      damageReduction: generateDamageReduction('3'),
      properties: '["LIGHT"]',
      initiativeModifier: 0,
      price: 120,
      weight: 65
    },
    {
      itemId: 'ite_Gxu930pPr0rtMUPQynAJJ',
      shieldArmorId: 'sha_4cGqVz-OVgpRStQAxDgNk',
      name: 'Bronze Breastplate',
      type: ItemTypes.armor,
      subType: ArmorSubTypes.mediumArmor,
      description: 'A breastplate armor made of bronze',
      damageReduction: generateDamageReduction('2'),
      properties: '["HEAVY_1"]',
      initiativeModifier: -1,
      price: 35,
      weight: 80
    },
    {
      itemId: 'ite_fz95ObDXAltpuMVdnZVVM',
      shieldArmorId: 'sha_iSUlnXDTEejN55jtXOyCI',
      name: 'Chain Mail',
      type: ItemTypes.armor,
      subType: ArmorSubTypes.mediumArmor,
      description: 'An armor made of small circles of metal',
      damageReduction: generateDamageReduction('3'),
      properties: '["HEAVY_1"]',
      initiativeModifier: -1,
      price: 50,
      weight: 100
    },
    {
      itemId: 'ite_mKomcIeswDG-do1VeI8cd',
      shieldArmorId: 'sha_-Km1dyRk6Qq1bIrfL4NdH',
      name: 'Iron Armor',
      type: ItemTypes.armor,
      subType: ArmorSubTypes.heavyArmor,
      description: 'A classic armor for good defense in combat',
      damageReduction: generateDamageReduction('4'),
      properties: '["HEAVY_2","RESISTANT"]',
      initiativeModifier: -2,
      price: 65,
      weight: 110
    },
    {
      itemId: 'ite_gOTWaPBqho1DSQJ3O2bfw',
      shieldArmorId: 'sha_Gonb3ZenznaSgLvnVhcjg',
      name: 'Steel Armor',
      type: ItemTypes.armor,
      subType: ArmorSubTypes.heavyArmor,
      description: 'A full plate armor made of steel',
      damageReduction: generateDamageReduction('5'),
      properties: '["HEAVY_2","RESISTANT"]',
      initiativeModifier: -2,
      price: 80,
      weight: 125
    },
    {
      itemId: 'ite_V1XSADM4r-bpZlePcafIG',
      shieldArmorId: 'sha_O64ljgAcrBsg9WMz2lPeu',
      name: 'Steel Laminated Armor',
      type: ItemTypes.armor,
      subType: ArmorSubTypes.heavyArmor,
      description: 'A really well made and strutured laminated steel armor',
      damageReduction: generateDamageReduction('6'),
      properties: '["HEAVY_3","RESISTANT"]',
      initiativeModifier: -3,
      price: 100,
      weight: 140
    },
    {
      itemId: 'ite_Lbnjq6LwAdekbtEvSu1Ke',
      shieldArmorId: 'sha_hU3x0Ctlb4_L0vd-ytl4l',
      name: 'Buckler',
      type: ItemTypes.shield,
      subType: ShieldSubTypes.buckler,
      description: 'A small shield made of leather and/or wood good for parrying',
      damageReduction: generateDamageReduction('STR+2'),
      properties: '["LIGHT"]',
      initiativeModifier: 0,
      price: 12,
      weight: 30
    },
    {
      itemId: 'ite__-V-OtKEEhTGBJ0gtR61Y',
      shieldArmorId: 'sha_XPQtZjpxkxjl_fric7TH9',
      name: 'Round Shield',
      type: ItemTypes.shield,
      subType: ShieldSubTypes.lightShield,
      description: 'A classic shield used by light weight warriors',
      damageReduction: generateDamageReduction('STR+4'),
      properties: '["LIGHT"]',
      initiativeModifier: 0,
      price: 24,
      weight: 50
    },
    {
      itemId: 'ite_cA0qYnUR1YiLUiTub0Uav',
      shieldArmorId: 'sha_-K5v6OXFhEiruy6Y5ShQ3',
      name: 'Medium Shield',
      type: ItemTypes.shield,
      subType: ShieldSubTypes.mediumShield,
      description: 'Shield used by knights and front line warriors',
      damageReduction: generateDamageReduction('STR+6'),
      properties: '["HEAVY"]',
      initiativeModifier: -1,
      price: 50,
      weight: 80
    },
    {
      itemId: 'ite_3ewCFUioD0q6V7O8ZqK6d',
      shieldArmorId: 'sha_LapqUdL0lHd2uFfGjtM91',
      name: 'Greatshield',
      type: ItemTypes.shield,
      subType: ShieldSubTypes.greatShield,
      description: 'Shields that are so big that can cover a person and be used as wall',
      damageReduction: generateDamageReduction('STR+8'),
      properties: '["HEAVY"]',
      initiativeModifier: -2,
      price: 80,
      weight: 120
    }
  ]
}
