export class InvalidIDPrefixSubject extends Error {
  name = 'InvalidIDPrefixSubject'

  constructor(public prefixSubject: string) {
    super(`Invalid ID prefix subject: ${prefixSubject}`)
  }
}
