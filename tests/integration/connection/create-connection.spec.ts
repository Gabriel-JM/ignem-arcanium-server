import request from 'superwstest'
import { server } from '@/main/server/app'

describe('Create connection integration', () => {

  beforeEach((done) => {
    server.listen(0, 'localhost', done)
  })
  afterEach(() => server.close())

  test('should return 200 response on connection accepted', async () => {
    await request(server).ws('/ws')
      .expectJson((messageData) => {
        expect(messageData.event).toBe('accept-connection')
        expect(messageData.headers).toHaveProperty('connectionId')
        expect(messageData.data).toBeNull()
      })
  })
})
