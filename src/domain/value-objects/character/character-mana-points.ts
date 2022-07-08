export class CharacterManaPoints {
  value: number

  constructor(level: number, intelligence: number) {
    this.value = this.#calculateManaPoints(level, intelligence)
  }

  #calculateManaPoints(level: number, intelligence: number) {
    const initialMP = 10
    let mp = initialMP

    for (let n=1; n <= level; n++) {
      mp += intelligence
    }

    return mp
  }
}
