import { WeaponSubTypes } from '../../src/domain/constants/index.ts'

function generateDamage(damage: string, ...types: string[]) {
  const typesRecord = types.reduce((acc, type) => {
    return { ...acc, [type]: damage }
  }, {})

  return JSON.stringify(typesRecord)
}

export function makeWeapons() {
  return [
    {
      itemId: 'ite_4aO5DzTD9phJDk885XjUt',
      weaponId: 'wea_R6lkk2GI7OhGnVQInAkWD',
      name: 'Dagger',
      subType: WeaponSubTypes.dagger,
      description: 'Deadly short range blade',
      damage: generateDamage('STR/DEX+1', 'slash', 'pierce'),
      properties: '["THROWABLE","LIGHT","PRECISION"]',
      initiativeModifier: 1,
      price: 5,
      weight: 25,
      distance: 0
    },
    {
      itemId: 'ite_vu14yrNkknYUlcu1I80yE',
      weaponId: 'wea_BEN7Mp1XWEkwh5HLU6sV8',
      name: 'Wood Staff',
      subType: WeaponSubTypes.staff,
      description: 'A wood made combat staff',
      damage: generateDamage('STR+2', 'strike'),
      properties: '[]',
      initiativeModifier: 0,
      price: 10,
      weight: 60,
      distance: 0
    },
    {
      itemId: 'ite_uEiLvsFkKLy1ud7d3KSmn',
      weaponId: 'wea_qr0qLO29Y0isrPpFQEGVZ',
      name: 'Short Sword',
      subType: WeaponSubTypes.shortSword,
      description: 'A short and light weight combat sword',
      damage: generateDamage('STR/DEX+2', 'slash', 'pierce'),
      properties: '["LIGHT"]',
      initiativeModifier: 0,
      price: 10,
      weight: 45,
      distance: 0
    },
    {
      itemId: 'ite_WGunVWuKbPwT3pYCgRJZ2',
      weaponId: 'wea_fODtfw2OXR0SpujyWqSz3',
      name: 'Long Sword',
      subType: WeaponSubTypes.longSword,
      description: 'Most common and versatile sword used by warriors and kings',
      damage: generateDamage('STR+3', 'slash', 'pierce'),
      properties: '["RESISTANT"]',
      initiativeModifier: -2,
      price: 14,
      weight: 70,
      distance: 0
    },
    {
      itemId: 'ite_HI22jiPj0cCybKvSzHv8v',
      weaponId: 'wea_PTV9yePZfescBFYbO1jQW',
      name: 'Great Sword',
      subType: WeaponSubTypes.greatSword,
      description: 'A really long blade sword, that most be used with two hands and sometimes',
      damage: generateDamage('STR+4', 'slash', 'pierce'),
      properties: '["RESISTANCE","TWO_HANDS","HEAVY"]',
      initiativeModifier: -4,
      price: 18,
      weight: 105,
      distance: 0
    },
    {
      itemId: 'ite_ri9hEbHYbaO9i1aOI6ZAP',
      weaponId: 'wea_7gfS6AO655jqwbRn07C18',
      name: 'Rapier',
      subType: WeaponSubTypes.rapier,
      description: 'A straight sword with a narrow pointed blade',
      damage: generateDamage('STR/DEX+2', 'pierce'),
      properties: '["LIGHT"]',
      initiativeModifier: 0,
      price: 12,
      weight: 40,
      distance: 0
    },
    {
      itemId: 'ite_kWcr2KRNlPAfqbm684DLH',
      weaponId: 'wea_0HcyBMlT30HXc1NRazxme',
      name: 'Axe',
      subType: WeaponSubTypes.axe,
      description: 'A combat designed hand axe',
      damage: generateDamage('STR+3', 'slash'),
      properties: '["RESISTANT","LIGHT"]',
      initiativeModifier: -2,
      price: 15,
      weight: 55,
      distance: 0
    },
    {
      itemId: 'ite_bAJQftjiYvxJiDMuAESIm',
      weaponId: 'wea_tggSQqMBSUGNXydywpNxd',
      name: 'War Axe',
      subType: WeaponSubTypes.greatAxe,
      description: 'A two hands great axe used in wars',
      damage: generateDamage('STR+4', 'slash'),
      properties: '["RESISTANT","TWO_HANDS","HEAVY"]',
      initiativeModifier: -4,
      price: 18,
      weight: 110,
      distance: 0
    },
    {
      itemId: 'ite_sWhrH2WXRD1Bdl5RWQrLu',
      weaponId: 'wea_iG-G6qtDbbGK8gvto89FK',
      name: 'Hammer',
      subType: WeaponSubTypes.hammer,
      description: 'A combat designed Hammer',
      damage: generateDamage('STR+3', 'strike'),
      properties: '["RESISTANT","HEAVY"]',
      initiativeModifier: -2,
      price: 15,
      weight: 65,
      distance: 0
    },
    {
      itemId: 'ite_sPo7kBX0b2P0w3fyexzLN',
      weaponId: 'wea_xojg0Npnq12sxzqzvemNM',
      name: 'Warhammer',
      subType: WeaponSubTypes.greatHammer,
      description: 'A really heavy and powerful hammer',
      damage: generateDamage('STR+4', 'strike'),
      properties: '["RESISTANT","TWO_HANDS","HEAVY"]',
      initiativeModifier: -4,
      price: 20,
      weight: 120,
      distance: 0
    },
    {
      itemId: 'ite_1kcSBgkE2qJ3kJNPrE989',
      weaponId: 'wea_V2IeVbSNEduEe1QeHveU5',
      name: 'Short Bow',
      subType: WeaponSubTypes.shortBow,
      description: 'A light and small bow',
      damage: generateDamage('1D6', 'pierce'),
      properties: '["AMMUNITION","PRECISION"]',
      initiativeModifier: 0,
      price: 6,
      weight: 30,
      distance: 35
    },
    {
      itemId: 'ite_8SUZ0Uvkx4oDS0KkdyUe7',
      weaponId: 'wea_rXWzgxjIl8s5itFGiO22E',
      name: 'Normal Bow',
      subType: WeaponSubTypes.bow,
      description: 'Common bow made for combat',
      damage: generateDamage('1D6+2', 'pierce'),
      properties: '["AMMUNITION","PRECISION"]',
      initiativeModifier: -1,
      price: 18,
      weight: 40,
      distance: 40
    },
    {
      itemId: 'ite_056iamptUme3kQm2UTiai',
      weaponId: 'wea_fNVtBullwitPNZ0OveIC3',
      name: 'Long Bow',
      subType: WeaponSubTypes.longBow,
      description: 'A great, more powerful and difficult to use bow',
      damage: generateDamage('2D6', 'pierce'),
      properties: '["AMMUNITION","PRECISION"]',
      initiativeModifier: -2,
      price: 25,
      weight: 55,
      distance: 45
    },
    {
      itemId: 'ite_IhnI2xkh5Dmv1MlPK0bVM',
      weaponId: 'wea_QsLlpn9VYVnInU3oElLbg',
      name: 'Hand Crossbow',
      subType: WeaponSubTypes.handCrossbow,
      description: 'A small crossbow that can be used with a single hand',
      damage: generateDamage('1D6+2', 'pierce'),
      properties: '["AMMUNITION","LIGHT"]',
      initiativeModifier: 0,
      price: 30,
      weight: 35,
      distance: 40
    },
    {
      itemId: 'ite_B2GE7X9b57OLWI3Jtn91X',
      weaponId: 'wea_8OURUnwUh47nCtDDxGko4',
      name: 'Crossbow',
      subType: WeaponSubTypes.crossbow,
      description: 'Classic and powerful crossbow',
      damage: generateDamage('1D6+4', 'pierce'),
      properties: '["AMMUNITION","TWO_HANDS","HEAVY"]',
      initiativeModifier: -3,
      price: 70,
      weight: 85,
      distance: 45
    }
  ]
}
