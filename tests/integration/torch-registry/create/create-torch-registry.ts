import { server } from '@/main/server/app'
import { createConnectionValidation, initServerAndDb } from '@/tests/integration/connection'
import { testKnex } from '@/tests/integration/test-db-connection/knex'
import request from 'superwstest'

describe('Create torch registry', () => {
  initServerAndDb(server, testKnex, 'torch_registries')

  it('should return a NoTorchToBeLitError response, if torchCount is 0', async () => {
    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'create-torch-registry',
        headers: {},
        data: {
          characterName: 'any_name',
          torchCount: 0,
          torchCharge: 0,
          isLit: true
        }
      })
      .expectJson(messageData => {
        expect(messageData.event).toBe('create-torch-registry-response')
        expect(messageData.statusCode).toBe(400)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toEqual({
          error: {
            name: 'NoTorchToBeLitError',
            details: ['No torch to be lit']
          }
        })
      })
  })

  it('should successfully create the torch registry in database', async () => {
    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'create-torch-registry',
        headers: {},
        data: {
          characterName: 'any_name',
          torchCount: 1,
          torchCharge: 3,
          isLit: false
        }
      })
      .expectJson(messageData => {
        testKnex
          .select()
          .from('torch_registries')
          .where({ id: messageData.data.id })
          .then(result => {
            expect(result[0]).toEqual({
              id: messageData.data.id,
              character_name: 'any_name',
              torch_count: 1,
              torch_charge: 3,
              is_lit: false
            })
          })

        expect(messageData.event).toBe('create-torch-registry-response')
        expect(messageData.statusCode).toBe(200)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toHaveProperty('id')
      })
  })
})
