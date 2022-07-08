export class CharacterHealthPoints {
  value: number

  constructor(level: number, strength: number, constitution: number) {
    const initialHP = 10 + strength
    this.value = level * constitution + initialHP
  }
}
