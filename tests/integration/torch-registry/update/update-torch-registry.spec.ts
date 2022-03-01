import { server } from '@/main/server/app'
import { createConnectionValidation } from '@/tests/integration/connection/create-connection'
import request from 'superwstest'
import { randomUUID } from 'crypto'
import { testKnex } from '@/tests/integration/test-db-connection/knex'

describe('Update torch registry', () => {  
  beforeAll(async () => {
    await testKnex.migrate.latest()
  })

  beforeEach((done) => void server.listen(0, 'localhost', done))
  afterEach((done) => void server.close(done))

  afterAll(async () => {
    await testKnex.raw('delete from torch_registries;')
    await testKnex.destroy()
  })

  it('should return a TorchRegistryNotFoundError if the provided id is not found', async () => {
    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'update-torch-registry',
        headers: {},
        data: {
          id: randomUUID(),
          torchCount: '+1',
          torchCharge: '+1',
          isLit: false
        }
      })
      .expectJson((messageData) => {        
        expect(messageData.event).toBe('update-torch-registry-response')
        expect(messageData.statusCode).toBe(404)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toEqual({
          error: {
            name: 'TorchRegistryNotFoundError',
            details: [
              'Torch registry not found'
            ]
          }
        })
      })
  })
})
