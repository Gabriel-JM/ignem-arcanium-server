import { server } from '@/main/server/app.js'
import { createConnectionValidation, initServerAndDb } from '@/tests/integration/connection/index.js'
import request from 'superwstest'
import { randomUUID } from 'crypto'
import { testKnex } from '@/tests/integration/test-db-connection/knex.js'

describe('Update torch registry', () => {
  initServerAndDb(server, testKnex, 'torch_registries')

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

  it('should return an InvalidTorchAdditionValueError if an invalid torchCount or torchCharge is provided', async () => {
    const torchRegistryId = randomUUID()

    await testKnex.table('torch_registries').insert({
      id: torchRegistryId,
      character_name: 'any_name',
      torch_count: 1,
      torch_charge: 3,
      is_lit: true
    })

    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'update-torch-registry',
        headers: {},
        data: {
          id: torchRegistryId,
          torchCount: '*1',
          torchCharge: '+1',
          isLit: false
        }
      })
      .expectJson((messageData) => {
        expect(messageData.event).toBe('update-torch-registry-response')
        expect(messageData.statusCode).toBe(400)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toEqual({
          error: {
            name: 'InvalidTorchAdditionValueError',
            details: [
              'Invalid value passed to torch count or charge addition. value: *1'
            ]
          }
        })
      })
  })
  
  it('should add the incomming value to the existing one if torchCount and torchCharge are strings', async () => {
    const torchRegistryId = randomUUID()

    await testKnex.table('torch_registries').insert({
      id: torchRegistryId,
      character_name: 'any_name',
      torch_count: 1,
      torch_charge: 3,
      is_lit: true
    })

    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'update-torch-registry',
        headers: {},
        data: {
          id: torchRegistryId,
          torchCount: '+2',
          torchCharge: '+1',
          isLit: false
        }
      })
      .expectJson((messageData) => {
        testKnex.select().from('torch_registries').where({ id: torchRegistryId }).then(([torchRegistry]) => {
          expect(torchRegistry).toEqual({
            id: torchRegistryId,
            character_name: 'any_name',
            torch_count: 3,
            torch_charge: 4,
            is_lit: true
          })
        })

        expect(messageData.event).toBe('update-torch-registry-response')
        expect(messageData.statusCode).toBe(204)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toBeNull()
      })
  })

  it('should replace the existing value to the incomming one if torchCount and torchCharge are numbers', async () => {
    const torchRegistryId = randomUUID()

    await testKnex.table('torch_registries').insert({
      id: torchRegistryId,
      character_name: 'any_name',
      torch_count: 1,
      torch_charge: 3,
      is_lit: true
    })

    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'update-torch-registry',
        headers: {},
        data: {
          id: torchRegistryId,
          torchCount: 2,
          torchCharge: 6,
          isLit: false
        }
      })
      .expectJson((messageData) => {
        testKnex.select().from('torch_registries').where({ id: torchRegistryId }).then(([torchRegistry]) => {
          expect(torchRegistry).toEqual({
            id: torchRegistryId,
            character_name: 'any_name',
            torch_count: 2,
            torch_charge: 6,
            is_lit: true
          })
        })

        expect(messageData.event).toBe('update-torch-registry-response')
        expect(messageData.statusCode).toBe(204)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toBeNull()
      })
  })
})
