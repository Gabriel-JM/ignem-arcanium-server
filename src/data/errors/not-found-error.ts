export class NotFoundError extends Error {
  name = 'NotFoundError'
  type = 'Search'

  constructor(subject: string) {
    super(`${subject} not found`)
  }
}
