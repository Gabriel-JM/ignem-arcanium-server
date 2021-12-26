export function mockKnex(...fields: string[]) {
  return Object.fromEntries(fields.map(fieldName => {
    return [fieldName, jest.fn().mockReturnThis()]
  }))
}
