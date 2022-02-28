import { server } from '@/main/server/app'
import { createConnectionValidation } from '@/tests/integration/connection/create-connection'
import request from 'superwstest'
import { randomUUID } from 'crypto'
import { connect } from '@/infra/db/knex/knex-helper'

describe('Update torch registry', () => {
  const knex = connect('ignem-arcanium.test.db')
  
  beforeAll(async () => {
    await knex.migrate.latest()
  })

  beforeEach((done) => void server.listen(0, 'localhost', done))
  afterEach((done) => void server.close(done))

  afterAll(async () => {
    await knex.raw('delete from torch_registries;')
    await knex.destroy()
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
        console.log(messageData)
        
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
