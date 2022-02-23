export function createConnectionValidation(messageData: Record<string, unknown>) {
  expect(messageData.event).toBe('accept-connection')
  expect(messageData.headers).toHaveProperty('connectionId')
  expect(messageData.data).toBeNull()
}
