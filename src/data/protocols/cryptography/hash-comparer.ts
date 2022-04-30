export interface HashComparer {
  compare(input: string, valueToCompare: string): Promise<boolean>
}
