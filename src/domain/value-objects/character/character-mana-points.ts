export class CharacterManaPoints {
  value: number

  constructor(level: number, intelligence: number) {
    const initialMP = 10
    this.value = level * intelligence + initialMP
  }
}
