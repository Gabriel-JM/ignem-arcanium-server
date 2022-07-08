export class CharacterHealthPoints {
  value: number

  constructor(level: number, strength: number, constitution: number) {
    this.value = this.#calculateHealthPoints(
      level,
      strength,
      constitution
    )
  }

  #calculateHealthPoints(
    level: number,
    strength: number,
    constitution: number
  ) {
    const initialHP = 10
    const firstLevelHP = initialHP + strength + constitution

    if (level === 1) {
      return firstLevelHP
    }

    let hp = firstLevelHP

    for (let n=2; n <= level; n++) {
      hp += constitution
    }

    return hp
  }
}
