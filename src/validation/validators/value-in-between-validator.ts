import { Validator } from '@/validation/protocols'

export class ValueInBetweenValidator implements Validator {
  constructor(
    private readonly min: number,
    private readonly max: number,
    private readonly fieldName: string
  ) {}
  
  validate(input: any): string[] {
    const value = input[this.fieldName]
    const isInBetween = value >= this.min && value <= this.max
    
    if (!isInBetween) {
      return [`${this.fieldName} must be in between ${this.min} and ${this.max}`]
    }

    return []    
  }
}
